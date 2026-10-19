"""One-time/optional image preparation. Generated assets are checked in; no runtime dependency."""
from pathlib import Path
import json, re, argparse
from PIL import Image
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'images' / 'optimized'
OUT.mkdir(parents=True, exist_ok=True)
CONTENT = ROOT / 'content'
CONTENT.mkdir(exist_ok=True)

# Capture the existing article bodies before generating their redesigned pages.
for name in ['post1', 'post2', 'post3']:
    target = CONTENT / f'{name}.html'
    if not target.exists():
        original = (ROOT / f'{name}.html').read_text(encoding='utf-8-sig')
        body = original[original.index('<h2>'):original.index('<div class="button-center">')].strip()
        target.write_text(body + '\n', encoding='utf-8')

used = set()
for content_path in CONTENT.glob('*.html'):
    used.update(re.findall(r'<img src="images/([^"]+)"', content_path.read_text(encoding='utf-8')))
used.add('UnityScenePreview3_008.png')
used.add('FirstSettlers_Progress_Settlement.png')
manifest = {}
for name in sorted(used):
    original = Image.open(ROOT / 'images' / name).convert('RGB')
    sizes = sorted(set([min(w, original.width) for w in [480, 960, 1600]]))
    variants = []
    for width in sizes:
        height = round(original.height * width / original.width)
        image = original.resize((width, height), Image.Resampling.LANCZOS)
        filename = f'{Path(name).stem}-{width}.webp'
        image.save(OUT / filename, 'WEBP', quality=83, method=6)
        variants.append({'width': width, 'height': height, 'src': 'images/optimized/' + filename})
    manifest[name] = {'width': original.width, 'height': original.height, 'variants': variants}

pdf = pdfium.PdfDocument(str(ROOT / 'reports' / 'AWSDeepracerReportSameerBalhara.pdf'))
page = pdf[0].render(scale=1.8).to_pil().convert('RGB')
page.thumbnail((1000, 1400), Image.Resampling.LANCZOS)
page.save(OUT / 'deepracer-report.webp', 'WEBP', quality=85, method=6)
manifest['report'] = {'width': page.width, 'height': page.height, 'src': 'images/optimized/deepracer-report.webp'}
pdf.close()

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--evidence', type=Path, help='Optional original PR screenshot to optimize.')
args = parser.parse_args()
evidence = args.evidence
evidence_target = OUT / 'layerprocgen-pr.webp'
if evidence and evidence.exists():
    image = Image.open(evidence).convert('RGB')
    image.thumbnail((1522, 1600), Image.Resampling.LANCZOS)
    image.save(evidence_target, 'WEBP', quality=90, method=6)
if evidence_target.exists():
    image = Image.open(evidence_target)
    manifest['evidence'] = {'width': image.width, 'height': image.height, 'src': 'images/optimized/layerprocgen-pr.webp'}
(CONTENT / 'images.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Prepared {len(used)} screenshot families, the report cover, and PR evidence.')

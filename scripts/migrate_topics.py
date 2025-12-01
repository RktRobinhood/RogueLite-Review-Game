import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
pack_dir = root / 'content' / 'AA_SL'
if not pack_dir.exists():
    print('Directory not found:', pack_dir)
    raise SystemExit(1)

js_files = list(pack_dir.glob('*.js'))
if not js_files:
    print('No JS files found in', pack_dir)
    raise SystemExit(1)

subject_re = re.compile(r"(?<!s)subject\s*:\s*'([^']*)'")
topic_re = re.compile(r"topic\s*:\s*'([^']*)'")

summary = {}
for f in js_files:
    text = f.read_text(encoding='utf-8')
    # Back up original
    bak = f.with_suffix(f.suffix + '.bak')
    if not bak.exists():
        bak.write_text(text, encoding='utf-8')
        print('Backup created:', bak.name)

    new_text, subj_count = subject_re.subn(lambda m: f"legacySubject: '{m.group(1)}'", text)
    new_text, topic_count = topic_re.subn(lambda m: f"legacyTopic: '{m.group(1)}'", new_text)

    if subj_count or topic_count:
        f.write_text(new_text, encoding='utf-8')
        print(f'Updated {f.name}: subject->{subj_count}, topic->{topic_count}')
    else:
        print(f'No changes for {f.name}')
    summary[f.name] = {'subject_replaced': subj_count, 'topic_replaced': topic_count}

print('\nSummary:')
for name, stats in summary.items():
    print(name, stats)

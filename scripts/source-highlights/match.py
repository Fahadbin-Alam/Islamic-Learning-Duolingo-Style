import json,re,sys,collections
D='/tmp/claude-0/data'
src=json.load(open('/tmp/claude-0/t/sources.json'))
STOP=set("the a an of to and or in on at by for with is are was were be been it its his her their he she they them this that these those what who whom which how why when where do does did not no yes from as into about you your all one has have had him our we us than then there so but if also just only very can will would should could may said says say allah prophet upon peace him messenger shall unto any every some more most other such those".split())
def words(s): return [w for w in re.findall(r"[a-z]+", s.lower()) if w not in STOP and len(w)>2]
def stem(w): return re.sub(r'(ing|ed|es|s)$','',w) if len(w)>4 else w
def norm(s): return re.sub(r'\s+',' ',s).strip()
ik={}
def iktext(s,a):
    if s not in ik: ik[s]={x['ayah']:x['text'] for x in json.load(open(f'{D}/ik{s}.json'))}
    return ik[s].get(a)
books={}
def hadith(book,num):
    if book not in books:
        try: d=json.load(open(f'{D}/eng-{book}.json'))
        except FileNotFoundError: books[book]=None; return None
        idx={}
        for x in d['hadiths']:
            an=x.get('arabicnumber',x['hadithnumber']); 
            try: f=float(an)
            except: continue
            base=int(f); sub=round((f-base)*100)
            idx.setdefault((base,sub),[]).append(x['text']); idx.setdefault((base,None),[]).append(x['text'])
        books[book]=idx
    idx=books[book]
    if idx is None: return None
    m=re.match(r'(\d+)([a-z]?)$',num)
    if not m: return None
    base=int(m.group(1)); letter=m.group(2)
    if letter: t=idx.get((base,ord(letter)-96))
    else: t=idx.get((base,0)) or idx.get((base,None))
    return ' '.join(t) if t else None
def spans(text):
    out=[]
    for para in re.split(r'\n+',text):
        for sent in re.split(r'(?<=[.!?;])\s+',para):
            run=[]
            for tok in sent.split()+['\x00']:
                clean=bool(re.fullmatch(r"[A-Za-z0-9,.;!?-]+",tok)) and not re.search(r'[.,;!?]\w',tok)
                if clean: run.append(tok); continue
                frag=' '.join(run).strip(' ,;-')
                if 7<=len(frag.split())<=40: out.append(frag)
                run=[]
    return out
res={}; stats=collections.Counter()
for s in src:
    url=s['url']
    m=re.match(r'https://quran\.com/(\d+):(\d+)/tafsirs/en-tafisr-ibn-kathir',url)
    if m: text=iktext(int(m.group(1)),int(m.group(2))); kind='ik'
    else:
        m=re.match(r'https://sunnah\.com/(\w+):(\w+)',url)
        if not m: stats['skip-url']+=1; continue
        text=hadith(m.group(1),m.group(2)); kind='h'
    if not text: stats[kind+'-notext']+=1; continue
    want=collections.Counter()
    for w in words(s['summary']): want[stem(w)]+=2
    for c in s['context']:
        for w in words(c): want[stem(w)]+=1
    best=None
    ntext=norm(text)
    for sp in spans(text):
        sw={stem(w) for w in words(sp)}
        shared=[w for w in sw if w in want]
        sumshared=[w for w in sw if w in {stem(x) for x in words(s['summary'])}]
        if len(shared)<3 or len(sumshared)<2: continue
        score=sum(min(want[w],3) for w in shared)/ (len(sp.split())**0.5)
        # start words must first occur at this span
        first=' '.join(sp.split()[:4]).lower()
        if ntext.lower().find(first)!=ntext.lower().find(sp.lower()): continue
        if best is None or score>best[0]: best=(score,sp)
    if best and best[0]>=1.6:
        h=best[1]
        assert h in ntext
        res[url+'|'+s['summary']]=h; stats[kind+'-ok']+=1
    else: stats[kind+'-nomatch']+=1
json.dump(res,open('/tmp/claude-0/hl/res.json','w'),indent=0)
print(stats)

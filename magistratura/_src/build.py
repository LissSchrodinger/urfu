import base64,json,sys
D='/home/claude/mag/'
r=lambda f:open(D+f,encoding='utf8').read()
head=r('part_head.html')+r('part_rest.css')+'</style></head><body>'
body=r('part_hero.html')+r('part_rest.html')
js=r('part_herojs.js')+r('part_rest.js').replace('%PROGS%',json.dumps(json.load(open(D+'progs2.json')),ensure_ascii=False))
html=head+body+'<script>'+js+'</script></body></html>'
html=html.replace('%LOGO%',r('logo.svg').replace('fill="#E50046"','fill="currentColor"'))
inline='--inline' in sys.argv
if inline:
    for f in ['bounded.woff2','golos-text-cyrillic-wght-normal.woff2','golos-text-latin-wght-normal.woff2']:
        b=base64.b64encode(open(D+'fonts/'+f,'rb').read()).decode()
        html=html.replace('url(fonts/'+f+')','url(data:font/woff2;base64,'+b+')')
open(D+('out/index.html' if inline else 'index.html'),'w',encoding='utf8').write(html)
print(len(html))

import base64,json,sys
D='/home/claude/mag/'
r=lambda f:open(D+f,encoding='utf8').read()
head=r('part_head.html')+r('part_rest.css')+r('part_prog.css')+r('hdr_land.css')+r('part_v8.css')+'</style></head><body>'
body='<div class="frame"><div class="scrim2"></div>'+r('hdr.html')+r('hdr_tpl.html')+r('part_hero.html')+r('part_rest.html')+'</div>'
js='(()=>{'+r('hdr.js')[:r('hdr.js').find('drawNav();')+10]+r('hdr_land.js')+'})();'+r('part_herojs.js')+r('part_dd.js')+r('part_top.js')+r('part_rest.js').replace('%PROGS%',json.dumps(json.load(open(D+'progs2.json')),ensure_ascii=False))
html=head+body+'<script>'+js+'</script></body></html>'
html=html.replace('%RAYS%',r('part_rays.svg'))
import re as _re
html=html.replace('%RAYS2%',_re.sub(r'(id="|url\(#)g',r'\1f',r('part_rays.svg')).replace('class="rays"','class="rays3"').replace('xMinYMin slice','xMidYMin slice'))
html=html.replace('%LOGO%',r('logo.svg').replace('fill="#E50046"','fill="currentColor"'))
inline='--inline' in sys.argv
if inline:
    for f in ['bounded.woff2','golos-text-cyrillic-wght-normal.woff2','golos-text-latin-wght-normal.woff2']:
        b=base64.b64encode(open(D+'fonts/'+f,'rb').read()).decode()
        html=html.replace('url(fonts/'+f+')','url(data:font/woff2;base64,'+b+')')
open(D+('out/index.html' if inline else 'index.html'),'w',encoding='utf8').write(html)
print(len(html))

import json
import os
    
def generate_readme(tpath):
    print("->>>>>>>>>>", tpath)    
    with open(tpath+"vx.json", 'r') as f:
        content = f.read()

    j = json.loads(content)    
    
    folders = j["folders"]

    files = j["files"]

    readme_txt = "# 这里是"+tpath.split("docs/")[1].rstrip("/") + "\n\n\n"
    for folder in folders:
        name = folder["name"]        
        generate_readme(tpath+name+"/")
    
    
    print("generate ",tpath+"README.md")
    with open(tpath+"README.md", 'w') as f:
        f.write(readme_txt)

    return readme_txt

def auto_sidebar(tpath, f_path=None) -> dict:
    print("-->>", tpath, f_path)
    l = []
    
    with open(tpath+"vx.json", 'r') as f:
        content = f.read()

    j = json.loads(content)    
    
    folders = j["folders"]

    files = j["files"]
    
    for folder in folders:
        name = folder["name"]        

        children = auto_sidebar(tpath+name+'/', f_path=f"{f_path}/{name}" if f_path else name)
        l.append({
            "text": name,
            "link": f"/{f_path}/{name}/" if f_path else name+'/',
            "collapsible": True,
            "children":children ,
        })
        
    
    for file in files:
        name = file["name"]
        l.append({
            "text":name.replace(".md",'',1),
            "link": f"/{f_path}/{name}" if f_path else name,
        })        

    return l

def readme_main():
    for n in ["notebook","ops","python","router","video", "web"]:
        os.system(f"mv {n} docs/{n}")

    generate_readme("docs/notebook/")
    generate_readme("docs/ops/")
    generate_readme("docs/python/")
    generate_readme("docs/router/")
    generate_readme("docs/video/")
    generate_readme("docs/web/")


def sidebar_main():
    sidebar_obj = {}
    for n in ["notebook","ops","python","router","video", "web"]:
        sidebar_obj[f"/{n}/"] = auto_sidebar(f"docs/{n}/", n)    
    
    code = f"""
let sidebarConfig = {json.dumps(sidebar_obj)}
"""+"export  {sidebarConfig}"
    
    with open("docs/.vuepress/mysidebar.js", 'w', encoding='utf8') as f:
        f.write(code)

readme_main()
sidebar_main()
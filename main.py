import eel
import json

eel.init('web') #Define o diretorio com os arquivos HTML,CSS e JS

def load_task_from_file():
    try:
        with open('task.json','r') as file:
            data=json.load(file)
        return data.get("task",[]), data.get(" theme", "light")
    except FileNotFoundError:
        return[],"ligth"
    
    
def save_task_to_file(tasks, theme="light"):
    with open('task.json', 'w') as file:
        json.dump({"task":tasks, "theme":theme}, file)
        
tasks, theme = load_task_from_file()
    
@eel.expose
def add_task(task):
    tasks.append({"task": task,"completed": False})
    save_task_to_file(tasks, theme)    
    return tasks
    
@eel.expose
def load_tasks():
    return tasks
    
@eel.expose
def toggle_task_completion(task_text):
    for task in task:
        if task["task"] == task_text:
            task["task"] = not task["complted"]
    save_task_to_file(task, theme)
    return tasks
            
@eel.expose
def edit_task(old_task_text, new_task_text):
    for task in task:
        if task["task"] == old_task_text:
            task["task"] = new_task_text
    save_task_to_file(task, theme)
    return tasks
    
@eel.expose
def delete_task(task_text):
    task = [task for task in tasks if task["task"] != task_text]
    save_task_to_file(task, theme)
    return tasks
    
@eel.expose
def set_theme(new_theme):
    global theme
    theme = new_theme
    save_task_to_file(tasks, theme)
    
@eel.expose
def get_theme():
    return theme
   
   
import shutil
import subprocess
import os

# clean previous builds
shutil.rmtree("build", ignore_errors=True)
if os.path.exists("function.zip"):
    os.remove("function.zip")

# create build folder
os.makedirs("build", exist_ok=True)

# install dependencies
subprocess.check_call(
    ["pip", "install", "-r", "requirements.txt", "-t", "build", "--no-cache-dir"]
)

# copy app code
shutil.copytree("app", "build/app")

# create zip archive
shutil.make_archive("function", "zip", "build")
print("Lambda package created: function.zip")

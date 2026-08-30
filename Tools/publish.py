import subprocess
from pathlib import Path
import sys
import json
from update_version import update_version
import shutil

ng_cmd = "ng.cmd" if sys.platform.startswith("win") else "ng"
npm_cmd = "npm.cmd" if sys.platform.startswith("win") else "npm"

release='release-22'
lib_name='dynamic-form'

# Ottieni la directory principale
tools_dir = Path(__file__).resolve().parent
main_dir = tools_dir.parent
project_dir = main_dir / 'projects' / lib_name
dist_dir = main_dir / 'dist' / lib_name

if __name__ == '__main__':
    print('⌛ Starting process...')
    # Chiedi all'utente se vuole aggiornare la versione
    update_version_input = input("Do you want to update the version? (Y/N): ").strip().lower()

    if update_version_input in ['y', 'yes']:
        # Esegui il comando per aggiornare la versione
        update_version()
        print('✅ Version updated')

    run_buid = input("Do you want to build? (Y/N): ").strip().lower()
    if run_buid in ['y', 'yes']:
        subprocess.call([ng_cmd, 'build',lib_name, '--configuration', 'production'], cwd=main_dir)
        print('✅ Build completed')

    shutil.copyfile(main_dir / 'LICENSE', dist_dir / 'LICENSE')
    shutil.copyfile(main_dir / 'README.md', dist_dir / 'README.md')

    npm_otp = input("Insert OTP Code: ").strip().lower()
    subprocess.call([npm_cmd, 'publish','--otp', npm_otp ,'--tag',release], cwd=dist_dir)
    print('✅ Publish completed')
    with open(project_dir / 'package.json', 'r') as f:
        package_json = json.load(f)
        version = package_json['version']
        print(f"Version: {version}")
    latest_npm = input(f"Do you want to publish {version} as latest NPM? (Y/N): ").strip().lower()
    if latest_npm in ['y', 'yes']:
        subprocess.call([npm_cmd, 'dist-tag','add',f'dynamic-angular-form@{version}','latest'], cwd=main_dir)
        print('✅ Latest NPM published')
    github_tags = input("Do you want to publish GitHub Tags? (Y/N): ").strip().lower()
    if github_tags in ['y', 'yes']:
        subprocess.call(['git', 'tag','v'+version], cwd=main_dir)
        subprocess.call(['git', 'push','origin','v'+version], cwd=main_dir)
        print('✅ GitHub Tags published')
        
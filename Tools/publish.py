import subprocess
from pathlib import Path
import sys
import json
from update_version import update_version

ng_cmd = "ng.cmd" if sys.platform.startswith("win") else "ng"
npm_cmd = "npm.cmd" if sys.platform.startswith("win") else "npm"

release='release-19-ionic'
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
        subprocess.call([ng_cmd, 'build', '--configuration', 'production'], cwd=main_dir)
        print('✅ Build completed')

    npm_otp = input("Insert OTP Code: ").strip().lower()
    subprocess.call([npm_cmd, 'publish','--otp', npm_otp ,'--tag',release], cwd=main_dir)
    print('✅ Publish completed')
        
    github_tags = input("Do you want to publish GitHub Tags? (Y/N): ").strip().lower()
    if github_tags in ['y', 'yes']:
        with open(project_dir / 'package.json', 'r') as f:
            package_json = json.load(f)
            version = package_json['version']
            print(f"Version: {version}")
        subprocess.call(['git', 'tag','v'+version], cwd=main_dir)
        subprocess.call(['git', 'push','origin','v'+version], cwd=main_dir)
        print('✅ GitHub Tags published')
        

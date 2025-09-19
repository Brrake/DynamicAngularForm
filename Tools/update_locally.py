import subprocess
from pathlib import Path
import sys
from update_version import update_version
ng_cmd = "ng.cmd" if sys.platform.startswith("win") else "ng"
npm_cmd = "npm.cmd" if sys.platform.startswith("win") else "npm"

lib_name='dynamic-form'

# Ottieni la directory principale
tools_dir = Path(__file__).resolve().parent
main_dir = tools_dir.parent
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
        subprocess.call([ng_cmd, 'build', '--configuration', 'development'], cwd=main_dir)
        print('✅ Build completed')

    # Esegui il comando npm pack nella directory dist/dynamic-form
    subprocess.call([npm_cmd, 'pack'], cwd=dist_dir)
    print('✅ Package created')

export class BrkError {
    loadSpinner = false
    isSubmitFailed = false
    errorMessage = ''

    resetError(loadSpinner: boolean = true): void {
        this.isSubmitFailed = false
        this.errorMessage = ''
        this.loadSpinner = loadSpinner
    }
    setError(message: string) {
        this.errorMessage = message
        this.isSubmitFailed = true
        this.loadSpinner = false
    }
}
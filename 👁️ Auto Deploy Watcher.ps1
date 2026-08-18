$projectPath = "C:\Users\ishit\OneDrive\Desktop\aether"
$logPath = Join-Path $projectPath "auto-deploy.log"
$debounceSeconds = 6
$watchExtensions = @(".html", ".css", ".js", ".json", ".xml", ".txt", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".webmanifest")
$ignoredPaths = @("\.git\", "\.vercel\", "\node_modules\")

function Write-DeployLog {
    param([string]$Message, [string]$Color = "Gray")
    $line = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message"
    Write-Host $line -ForegroundColor $Color
    Add-Content -LiteralPath $logPath -Value $line
}

function Test-DeployableChange {
    param([string]$Path)
    $normalizedPath = $Path.Replace('/', '\')
    if ($normalizedPath -eq $logPath) { return $false }
    if ($ignoredPaths | Where-Object { $normalizedPath -like "*$_*" }) { return $false }
    return $watchExtensions -contains [IO.Path]::GetExtension($normalizedPath).ToLowerInvariant()
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Aetherfolio Auto Deploy Watcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Set-Location $projectPath
try {
    & vercel whoami --token YOUR_VERCEL_TOKEN_HERE 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Vercel is not logged in." }
    Write-DeployLog "Vercel authentication verified. Watching for changes..." "Green"
} catch {
    Write-DeployLog "Vercel authentication is required. Run 'vercel login' once, then restart this watcher." "Red"
    exit 1
}

$watcher = [System.IO.FileSystemWatcher]::new($projectPath, "*.*")
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::Size
$watcher.EnableRaisingEvents = $true

$global:pendingChange = $null
$onChange = {
    if (Test-DeployableChange $Event.SourceEventArgs.FullPath) {
        $global:pendingChange = $Event.SourceEventArgs.FullPath
    }
}

$subscriptions = @(
    Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $onChange,
    Register-ObjectEvent -InputObject $watcher -EventName Created -Action $onChange,
    Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $onChange,
    Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $onChange
)

try {
    while ($true) {
        Start-Sleep -Milliseconds 750
        if (-not $global:pendingChange) { continue }

        $changedFile = $global:pendingChange
        $global:pendingChange = $null
        Start-Sleep -Seconds $debounceSeconds
        if ($global:pendingChange) { continue }

        Write-DeployLog "Change detected: $([IO.Path]::GetFileName($changedFile)). Deploying..." "Yellow"
        & vercel --prod --yes --token YOUR_VERCEL_TOKEN_HERE 2>&1 | Tee-Object -FilePath $logPath -Append
        if ($LASTEXITCODE -eq 0) {
            Write-DeployLog "Deployment complete: https://aetherfolio.vercel.app" "Green"
        } else {
            Write-DeployLog "Deployment failed. See auto-deploy.log for details." "Red"
        }
    }
} finally {
    $subscriptions | Unregister-Event -ErrorAction SilentlyContinue
    $watcher.Dispose()
}

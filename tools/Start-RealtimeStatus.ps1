param(
    [string]$HostName = "127.0.0.1",
    [int]$Port = 8765,
    [switch]$Background
)

$ErrorActionPreference = "Stop"
$ScriptPath = Join-Path $PSScriptRoot "realtime-status-server.py"
$ServerRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).ProviderPath
$LogPath = (Resolve-Path (Join-Path $ServerRoot "logs\latest.log")).ProviderPath
$PropertiesPath = (Resolve-Path (Join-Path $ServerRoot "server.properties")).ProviderPath
$Arguments = @(
    "-3",
    $ScriptPath,
    "--host", $HostName,
    "--port", [string]$Port,
    "--log", $LogPath,
    "--properties", $PropertiesPath
)

if ($Background) {
    $LogFile = Join-Path $env:TEMP "kuronomy-realtime-status.log"
    $ErrFile = Join-Path $env:TEMP "kuronomy-realtime-status.err.log"
    Start-Process -FilePath "py" -ArgumentList $Arguments -WorkingDirectory $ServerRoot -RedirectStandardOutput $LogFile -RedirectStandardError $ErrFile -WindowStyle Hidden
    Write-Host "Realtime status bridge started on http://$HostName`:$Port"
    Write-Host "stdout: $LogFile"
    Write-Host "stderr: $ErrFile"
    exit 0
}

Set-Location $ServerRoot
& py @Arguments

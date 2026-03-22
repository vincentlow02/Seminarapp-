# convert-to-webp.ps1
# Batch converts all large SVG photo files to WebP format
# Run this once locally. Requires: cwebp (from Google WebP tools)
# Install: winget install Google.WebP OR https://developers.google.com/speed/webp/download

# Folders containing your image files
$folders = @("asia", "eu", "oc", "se", "us", "other")

foreach ($folder in $folders) {
    $svgFiles = Get-ChildItem -Path ".\$folder" -Filter "*.svg"
    foreach ($file in $svgFiles) {
        $baseName   = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $outputPath = Join-Path $file.DirectoryName "$baseName.webp"

        if (Test-Path $outputPath) {
            Write-Host "SKIP (exists): $outputPath"
            continue
        }

        # cwebp: quality 82 gives excellent visual quality at ~90% smaller size
        & cwebp -q 82 $file.FullName -o $outputPath
        if ($LASTEXITCODE -eq 0) {
            $oldSize = [math]::Round($file.Length / 1MB, 2)
            $newSize = [math]::Round((Get-Item $outputPath).Length / 1MB, 2)
            Write-Host "OK  $($file.FullName) ($oldSize MB) -> $outputPath ($newSize MB)"
        } else {
            Write-Host "FAIL: $($file.FullName)"
        }
    }
}

Write-Host ""
Write-Host "Done! Now update imageMap in index.html to use .webp extensions."
Write-Host "Example: 'asia/jp.svg' -> 'asia/jp.webp'"

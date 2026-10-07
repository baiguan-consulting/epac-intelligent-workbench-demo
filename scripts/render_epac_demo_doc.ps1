$ErrorActionPreference = "Stop"

$inputPath = "C:\Users\12359\Desktop\epac演示.docx"
$outputDir = "D:\E-PAC智能体\outputs\epac_demo_doc_word_render"
$pdfPath = Join-Path $outputDir "epac演示.pdf"

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$document = $null

try {
    $document = $word.Documents.Open($inputPath, $false, $true)
    $document.ExportAsFixedFormat($pdfPath, 17)
}
finally {
    if ($document) {
        $document.Close($false)
    }
    $word.Quit()
}

Write-Output $pdfPath

Add-Type -AssemblyName System.Drawing

function New-RoundedRectPath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $Radius * 2

  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function New-Color([string]$Hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($Hex)
}

function Draw-Crescent {
  param(
    [System.Drawing.Graphics]$Graphics,
    [float]$X,
    [float]$Y,
    [float]$Size,
    [System.Drawing.Color]$OuterColor,
    [System.Drawing.Color]$InnerColor
  )

  $outerBrush = New-Object System.Drawing.SolidBrush $OuterColor
  $innerBrush = New-Object System.Drawing.SolidBrush $InnerColor

  try {
    $Graphics.FillEllipse($outerBrush, $X, $Y, $Size, $Size)
    $Graphics.FillEllipse($innerBrush, $X + ($Size * 0.28), $Y + ($Size * 0.05), $Size * 0.78, $Size * 0.78)
  } finally {
    $outerBrush.Dispose()
    $innerBrush.Dispose()
  }
}

function Draw-Book {
  param(
    [System.Drawing.Graphics]$Graphics,
    [float]$CenterX,
    [float]$CenterY,
    [float]$Scale,
    [bool]$UseShadow
  )

  $pageColor = New-Color "#FFFFFF"
  $spineColor = New-Color "#E7F0EA"
  $lineColor = New-Color "#0D7A55"
  $bookmarkColor = New-Color "#F4C542"

  if ($UseShadow) {
    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(36, 6, 65, 45))
    try {
      $Graphics.FillEllipse($shadowBrush, $CenterX - ($Scale * 0.72), $CenterY + ($Scale * 0.48), $Scale * 1.44, $Scale * 0.28)
    } finally {
      $shadowBrush.Dispose()
    }
  }

  $leftPath = New-RoundedRectPath -X ($CenterX - ($Scale * 0.62)) -Y ($CenterY - ($Scale * 0.42)) -Width ($Scale * 0.56) -Height ($Scale * 0.78) -Radius ($Scale * 0.12)
  $rightPath = New-RoundedRectPath -X ($CenterX + ($Scale * 0.06)) -Y ($CenterY - ($Scale * 0.42)) -Width ($Scale * 0.56) -Height ($Scale * 0.78) -Radius ($Scale * 0.12)

  $pageBrush = New-Object System.Drawing.SolidBrush $pageColor
  $spineBrush = New-Object System.Drawing.SolidBrush $spineColor
  $linePen = New-Object System.Drawing.Pen $lineColor, ($Scale * 0.045)
  $bookmarkBrush = New-Object System.Drawing.SolidBrush $bookmarkColor

  try {
    $Graphics.FillPath($pageBrush, $leftPath)
    $Graphics.FillPath($pageBrush, $rightPath)
    $Graphics.DrawPath($linePen, $leftPath)
    $Graphics.DrawPath($linePen, $rightPath)
    $Graphics.FillRectangle($spineBrush, $CenterX - ($Scale * 0.08), $CenterY - ($Scale * 0.36), $Scale * 0.16, $Scale * 0.72)
    $Graphics.DrawLine($linePen, $CenterX, $CenterY - ($Scale * 0.33), $CenterX, $CenterY + ($Scale * 0.33))
    $Graphics.FillRectangle($bookmarkBrush, $CenterX - ($Scale * 0.08), $CenterY - ($Scale * 0.42), $Scale * 0.16, $Scale * 0.28)
  } finally {
    $pageBrush.Dispose()
    $spineBrush.Dispose()
    $linePen.Dispose()
    $bookmarkBrush.Dispose()
    $leftPath.Dispose()
    $rightPath.Dispose()
  }
}

function Draw-BrandAsset {
  param(
    [string]$Path,
    [int]$Size,
    [bool]$TransparentBackground = $false,
    [bool]$SmallCanvas = $false
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $green = New-Color "#14B86A"
  $darkGreen = New-Color "#0D7A55"
  $cream = New-Color "#FFF7D6"
  $mint = New-Color "#CCF2DC"
  $gold = New-Color "#F4C542"

  if ($TransparentBackground) {
    $graphics.Clear([System.Drawing.Color]::Transparent)
  } else {
    $graphics.Clear($green)
  }

  $orbitBrush = New-Object System.Drawing.SolidBrush $mint
  $creamBrush = New-Object System.Drawing.SolidBrush $cream
  $goldBrush = New-Object System.Drawing.SolidBrush $gold

  try {
    if (-not $TransparentBackground) {
      $graphics.FillEllipse($orbitBrush, $Size * 0.18, $Size * 0.18, $Size * 0.64, $Size * 0.64)
      $graphics.FillEllipse($creamBrush, $Size * 0.2, $Size * 0.18, $Size * 0.6, $Size * 0.6)
      $graphics.FillEllipse($orbitBrush, $Size * 0.12, $Size * 0.68, $Size * 0.18, $Size * 0.08)
      $graphics.FillEllipse($orbitBrush, $Size * 0.72, $Size * 0.66, $Size * 0.16, $Size * 0.07)
      $graphics.FillEllipse($goldBrush, $Size * 0.2, $Size * 0.14, $Size * 0.07, $Size * 0.07)
      Draw-Crescent -Graphics $graphics -X ($Size * 0.63) -Y ($Size * 0.16) -Size ($Size * 0.12) -OuterColor $gold -InnerColor $cream
      Draw-Book -Graphics $graphics -CenterX ($Size * 0.5) -CenterY ($Size * 0.53) -Scale ($Size * 0.36) -UseShadow $true
    } else {
      $graphics.FillEllipse($orbitBrush, $Size * 0.24, $Size * 0.18, $Size * 0.52, $Size * 0.52)
      $graphics.FillEllipse($creamBrush, $Size * 0.26, $Size * 0.2, $Size * 0.48, $Size * 0.48)
      $graphics.FillEllipse($goldBrush, $Size * 0.22, $Size * 0.7, $Size * 0.12, $Size * 0.05)
      Draw-Crescent -Graphics $graphics -X ($Size * 0.6) -Y ($Size * 0.18) -Size ($Size * 0.1) -OuterColor $gold -InnerColor $cream
      Draw-Book -Graphics $graphics -CenterX ($Size * 0.5) -CenterY ($Size * 0.5) -Scale ($(if ($SmallCanvas) { $Size * 0.32 } else { $Size * 0.3 })) -UseShadow $false

      $sparklePen = New-Object System.Drawing.Pen $darkGreen, ($Size * 0.018)
      try {
        $graphics.DrawLine($sparklePen, $Size * 0.31, $Size * 0.27, $Size * 0.31, $Size * 0.33)
        $graphics.DrawLine($sparklePen, $Size * 0.28, $Size * 0.3, $Size * 0.34, $Size * 0.3)
      } finally {
        $sparklePen.Dispose()
      }
    }
  } finally {
    $orbitBrush.Dispose()
    $creamBrush.Dispose()
    $goldBrush.Dispose()
    $graphics.Dispose()
  }

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }

  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root "assets"

Draw-BrandAsset -Path (Join-Path $assets "icon.png") -Size 1024
Draw-BrandAsset -Path (Join-Path $assets "adaptive-icon.png") -Size 1024 -TransparentBackground $true
Draw-BrandAsset -Path (Join-Path $assets "splash-icon.png") -Size 1024 -TransparentBackground $true -SmallCanvas $true
Draw-BrandAsset -Path (Join-Path $assets "favicon.png") -Size 256

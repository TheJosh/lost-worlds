<?php
$var_name = 'img_' . str_replace('.', '_', basename($argv[1]));
$out_file = str_replace('.png', '.js', basename($argv[1]));

$binary = file_get_contents($argv[1]);
$base64 = base64_encode($binary);

$out_str = "var {$var_name} = 'data:image/png;base64,{$base64}';\n";

file_put_contents($out_file, $out_str);

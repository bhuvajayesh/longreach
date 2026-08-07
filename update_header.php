<?php
$content = file_get_contents('header.html');
$content = preg_replace_callback('/href="([^"]+)"/', function($matches) {
    $href = $matches[1];
    if ($href === './' || strpos($href, '.html') !== false || strpos($href, 'http') === 0 || strpos($href, '#') === 0) {
        return 'href="' . $href . '"';
    }
    return 'href="' . $href . '.html"';
}, $content);
file_put_contents('header.html', $content);
echo "Updated header.html\n";

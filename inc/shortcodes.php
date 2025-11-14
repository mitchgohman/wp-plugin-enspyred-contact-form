<?php
// Add shortcode to render the React mount point.
// Safe for use inside the_content: returns a string (no echo) and supports multiple instances.
add_shortcode('enspyred_contact_form', function ($atts = []) {
    static $instance = 0;
    $instance++;

    $atts = shortcode_atts([
        'id'     => '',            // optional custom id suffix
        'class'  => '',            // optional extra class names (space-delimited)
        'form'   => '',            // form ID or slug
        'config' => 'default',     // legacy support
    ], $atts, 'enspyred_contact_form');

    // Resolve form ID - no default fallback, user must specify a form
    $form_id = null;

    if ($atts['form']) {
        // Check if it's numeric (form ID) or slug
        if (is_numeric($atts['form'])) {
            $form_id = $atts['form'];
        } else {
            // Look up by slug
            $forms = get_option('ecf_forms', []);
            foreach ($forms as $id => $form) {
                if ($form['slug'] === $atts['form']) {
                    $form_id = $id;
                    break;
                }
            }
        }
    } elseif ($atts['config'] !== 'default') {
        // Legacy config support - map to form ID
        $form_id = $atts['config'];
    }

    // If no valid form ID found, return error message
    if (!$form_id) {
        return '<div style="border: 1px solid #dc3545; background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px;">' .
               '<strong>Contact Form Error:</strong> No form specified. Please use [enspyred_contact_form form="your-form-name"] with a valid form name.' .
               '</div>';
    }    // Build a unique, predictable id
    $suffix = $atts['id'] !== '' ? sanitize_title_with_dashes($atts['id']) : (string) $instance;
    $dom_id = 'enspyred-plugin-contact-form-' . $suffix;

    // Sanitize multiple class names while preserving spaces
    $extra_classes = trim(preg_replace('/\s+/', ' ', $atts['class']));
    $class_tokens  = array_filter(explode(' ', $extra_classes));
    $safe_tokens   = array_map('sanitize_html_class', $class_tokens);
    $classes = trim('enspyred-plugin-contact-form ecf-root ' . implode(' ', $safe_tokens));

    // Return the mount point markup (no echo), so it renders correctly inside the_content
    $html  = '<div'
          .  ' id="' . esc_attr($dom_id) . '"'
          .  ' class="' . esc_attr($classes) . '"'
          .  ' data-ecf-instance="' . esc_attr($suffix) . '"'
          .  ' data-ecf-config="' . esc_attr($form_id) . '">'
          .  '</div>';

    return $html;
});
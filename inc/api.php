<?php
/**
 * Recursively merge form configs by parent_id, merging arrays by id where appropriate.
 * @param int|string $form_id
 * @param array|null $visited Used to prevent cycles
 * @return array merged config
 */
function ecf_get_merged_config($form_id, $visited = null) {
    if ($visited === null) $visited = [];
    $form_id = (string)$form_id;
    if (in_array($form_id, $visited, true)) {
        // Prevent infinite loop on cycles
        return [];
    }
    $visited[] = $form_id;
    $forms = get_option('ecf_forms', []);
    $form = isset($forms[$form_id]) ? $forms[$form_id] : null;
    if (!$form) return [];
    $raw = get_option('ecf_config_' . $form_id, '');
    $config = $raw ? json_decode($raw, true) : [];
    if (!is_array($config)) $config = [];
    $parent_id = isset($form['parent_id']) ? $form['parent_id'] : null;
    if ($parent_id) {
        $parent_config = ecf_get_merged_config($parent_id, $visited);
        $config = ecf_deep_merge_config($parent_config, $config);
    }
    return $config;
}

/**
 * Deep merge two config arrays, merging arrays by id for 'elements' and 'controls'.
 * Child overrides parent.
 * @param array $parent
 * @param array $child
 * @return array
 */
function ecf_deep_merge_config($parent, $child) {
    foreach ($child as $key => $value) {
        if (is_array($value) && isset($parent[$key]) && is_array($parent[$key])) {
            // Special handling for 'elements' and 'controls' arrays
            if (($key === 'elements' || $key === 'controls') && ecf_is_indexed_array($value) && ecf_is_indexed_array($parent[$key])) {
                $parent[$key] = ecf_merge_array_by_id($parent[$key], $value);
            } else {
                $parent[$key] = ecf_deep_merge_config($parent[$key], $value);
            }
        } else {
            $parent[$key] = $value;
        }
    }
    return $parent;
}

/**
 * Check if array is indexed (not associative)
 */
function ecf_is_indexed_array($arr) {
    if (!is_array($arr)) return false;
    return array_keys($arr) === range(0, count($arr) - 1);
}

/**
 * Merge two indexed arrays of associative arrays by 'id' key.
 * Child items override parent items with same id, new ids are appended.
 */
function ecf_merge_array_by_id($parentArr, $childArr) {
    $result = [];
    $map = [];
    foreach ($parentArr as $item) {
        if (isset($item['id'])) {
            $map[$item['id']] = $item;
        } else {
            $result[] = $item;
        }
    }
    foreach ($childArr as $item) {
        if (isset($item['id'])) {
            $map[$item['id']] = isset($map[$item['id']])
                ? ecf_deep_merge_config($map[$item['id']], $item)
                : $item;
        } else {
            $result[] = $item;
        }
    }
    // Re-index
    return array_values(array_merge($map, $result));
}



// REST: GET /wp-json/enspyred-contact-form/v1/config?key={config_id}
add_action('rest_api_init', function () {
    register_rest_route('enspyred-contact-form/v1', '/config', [
        'methods'  => 'GET',
        'permission_callback' => '__return_true', // public read
        'callback' => function (WP_REST_Request $request) {
            $key = sanitize_text_field($request->get_param('key'));
            if (!$key) {
                return new WP_REST_Response([ 'error' => 'missing key' ], 400);
            }

            // Fetch the merged config (with parent inheritance)
            $formConfig = ecf_get_merged_config($key);
            if (!$formConfig) {
                return new WP_REST_Response([ 'error' => 'not found' ], 404);
            }

            // Fetch global settings (exclude secret key for security)
            $globalSettings = get_option('ecf_global_settings', [
                'recaptcha_site_key' => '',
                'recaptcha_score_threshold' => 0.5,
                'recaptcha_enabled' => false
            ]);
            unset($globalSettings['recaptcha_secret_key']);

            // Return combined response
            return rest_ensure_response([
                'formConfig' => $formConfig,
                'globalSettings' => $globalSettings
            ]);
        }
    ]);
});


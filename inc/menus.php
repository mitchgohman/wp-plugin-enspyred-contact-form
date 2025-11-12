<?php
// Add admin menu and settings page
add_action('admin_menu', function () {
    // Create top-level menu only if not already present
    if (!isset($GLOBALS['menu_slug_enspyred'])) {
        add_menu_page(
            'Enspyred',
            'Enspyred',
            'manage_options',
            'enspyred',
            '', // No callback
            'dashicons-admin-generic',
            26
        );
        $GLOBALS['menu_slug_enspyred'] = true;
    }

    // Add this plugin's submenu
    add_submenu_page(
        'enspyred',
        'Contact Forms',
        'Contact Forms',
        'manage_options',
        'enspyred-contact-forms',
        'ecf_admin_contact_forms_router'
    );
}, 9);

// Remove the duplicate submenu that matches the top-level menu
add_action('admin_menu', function () {
    global $submenu;
    if (isset($submenu['enspyred'])) {
        foreach ($submenu['enspyred'] as $index => $item) {
            if ($item[2] === 'enspyred') {
                unset($submenu['enspyred'][$index]);
            }
        }
    }
}, 999);

// Redirect top-level "Enspyred" menu to the first submenu (Contact Forms)
add_action('admin_menu', function () {
    if (
        is_admin() &&
        isset($_GET['page']) &&
        sanitize_text_field(wp_unslash($_GET['page'])) === 'enspyred' &&
        current_user_can('manage_options')
    ) {
        wp_safe_redirect(admin_url('admin.php?page=enspyred-contact-forms'));
        exit;
    }
}, 1000);
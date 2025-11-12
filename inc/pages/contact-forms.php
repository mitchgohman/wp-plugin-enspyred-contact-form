<?php
// Contact Forms default page (shows Add New + Existing)
function ecf_admin_contact_forms_page() {
    // Check if we're editing a specific form
    $editing_form = isset($_GET['edit']) ? sanitize_text_field(wp_unslash($_GET['edit'])) : null;
    if ($editing_form) {
        ecf_admin_edit_form_page($editing_form);
        return;
    }
    $global_settings = get_option('ecf_global_settings', []);
    $forms = get_option('ecf_forms', []);
    // Sort forms by name (alphanumeric)
    if (!empty($forms)) {
        uasort($forms, function($a, $b) {
            return strnatcasecmp($a['name'], $b['name']);
        });
    }
    ?>
    <div class="wrap">
        <!-- Add New Form -->
        <form method="post" action="" style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <?php wp_nonce_field('ecf_settings', 'ecf_nonce'); ?>
            <input type="hidden" name="action" value="create_form">
            <h3>Add New Form</h3>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="new_form_name">Form Name</label>
                    </th>
                    <td>
                        <input
                            type="text"
                            id="new_form_name"
                            name="new_form_name"
                            placeholder="e.g. Newsletter Signup"
                            class="regular-text"
                            required
                        />
                        <p class="description">A descriptive name for this form</p>
                    </td>
                </tr>
            </table>
            <?php submit_button('Create Form', 'secondary'); ?>
        </form>
        <!-- Existing Forms -->
        <h3>Existing Forms</h3>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Parent</th>
                    <th width="550px">Shortcode</th>
                    <th width="150px">Created</th>
                    <th width="110px">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($forms as $id => $form): ?>
                <tr>
                    <td><?php echo esc_html($form['name']); ?></td>
                    <td>
                        <?php
                        if (!empty($form['parent_id']) && isset($forms[$form['parent_id']])) {
                            echo esc_html($forms[$form['parent_id']]['name']);
                        } else {
                            echo '<em>None</em>';
                        }
                        ?>
                    </td>
                    <td>
                        <code>[enspyred_contact_form form="<?php echo esc_attr($form['slug']); ?>"]</code>
                        <button type="button" onclick="navigator.clipboard.writeText('[enspyred_contact_form form=&quot;<?php echo esc_attr($form['slug']); ?>&quot;]')" class="button button-small">Copy</button>
                    </td>
                    <td><?php echo esc_html($form['created']); ?></td>
                    <td>
                        <a href="?page=enspyred-contact-forms&edit=<?php echo esc_attr($id); ?>" class="button button-small">Edit</a>
                        <form method="post" action="" style="display: inline;">
                            <?php wp_nonce_field('ecf_settings', 'ecf_nonce'); ?>
                            <input type="hidden" name="action" value="delete_form">
                            <input type="hidden" name="form_id" value="<?php echo esc_attr($id); ?>">
                            <button type="submit" class="button button-small" onclick="return confirm('Are you sure you want to delete this form?')">Delete</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
                <?php if (empty($forms)): ?>
                <tr>
                    <td colspan="6" style="text-align: center; color: #666; font-style: italic;">
                        No forms created yet. Use the form above to create your first form.
                    </td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

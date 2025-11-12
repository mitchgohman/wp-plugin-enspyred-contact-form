<?php
// Settings page (just settings)
function ecf_admin_settings_page() {
    if ($_POST && isset($_POST['ecf_nonce']) && wp_verify_nonce(wp_unslash($_POST['ecf_nonce']), 'ecf_settings')) {
        ecf_handle_admin_form_submission();
    }
    // Show only one settings message per save
    settings_errors('ecf_settings');
    $global_settings = get_option('ecf_global_settings', []);
    ?>
    <div class="wrap">
        <h1>Contact Form Settings</h1>
        <!-- reCAPTCHA Settings -->
        <form method="post" action="">
            <?php wp_nonce_field('ecf_settings', 'ecf_nonce'); ?>
            <input type="hidden" name="action" value="update_recaptcha">
            <h2>reCAPTCHA Settings</h2>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="recaptcha_site_key">Site Key</label>
                    </th>
                    <td>
                        <input
                            type="text"
                            id="recaptcha_site_key"
                            name="recaptcha_site_key"
                            value="<?php echo esc_attr($global_settings['recaptcha_site_key'] ?? ''); ?>"
                            class="regular-text"
                        />
                        <p class="description">Your reCAPTCHA v3 site key</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="recaptcha_secret_key">Secret Key</label>
                    </th>
                    <td>
                        <div style="position: relative; display: inline-block;">
                            <input
                                type="password"
                                id="recaptcha_secret_key"
                                name="recaptcha_secret_key"
                                value="<?php echo esc_attr($global_settings['recaptcha_secret_key'] ?? ''); ?>"
                                class="regular-text"
                                style="padding-right: 40px;"
                            />
                            <button
                                type="button"
                                id="toggle_secret_key"
                                style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #666; font-size: 14px; padding: 0; width: 20px; height: 20px;"
                                title="Show/Hide Secret Key"
                                onclick="toggleSecretKeyVisibility()"
                            >
                                👁️
                            </button>
                        </div>
                        <p class="description">Your reCAPTCHA v3 secret key</p>
                        <script>
                        function toggleSecretKeyVisibility() {
                            const input = document.getElementById('recaptcha_secret_key');
                            const button = document.getElementById('toggle_secret_key');
                            if (input.type === 'password') {
                                input.type = 'text';
                                button.innerHTML = '🙈';
                                button.title = 'Hide Secret Key';
                            } else {
                                input.type = 'password';
                                button.innerHTML = '👁️';
                                button.title = 'Show Secret Key';
                            }
                        }
                        </script>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="recaptcha_score_threshold">Score Threshold</label>
                    </th>
                    <td>
                        <input
                            type="number"
                            id="recaptcha_score_threshold"
                            name="recaptcha_score_threshold"
                            value="<?php echo esc_attr($global_settings['recaptcha_score_threshold'] ?? '0.5'); ?>"
                            min="0"
                            max="1"
                            step="0.1"
                            class="small-text"
                        />
                        <p class="description">Minimum score required (0.0 - 1.0). Lower = more strict</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="recaptcha_enabled">Enable reCAPTCHA</label>
                    </th>
                    <td>
                        <input
                            type="checkbox"
                            id="recaptcha_enabled"
                            name="recaptcha_enabled"
                            value="1"
                            <?php checked($global_settings['recaptcha_enabled'] ?? false); ?>
                        />
                        <label for="recaptcha_enabled">Enable reCAPTCHA protection on all forms</label>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save reCAPTCHA Settings'); ?>
        </form>
        <!-- Mail Settings -->
        <form method="post" action="">
            <?php wp_nonce_field('ecf_settings', 'ecf_nonce'); ?>
            <input type="hidden" name="action" value="update_mail">
            <h2>Mail Settings</h2>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="mail_driver">Mail Driver</label>
                    </th>
                    <td>
                        <select id="mail_driver" name="mail_driver" onchange="toggleMailSettings()">
                            <option value="mailtrap" <?php selected($global_settings['mail_driver'] ?? 'mailtrap', 'mailtrap'); ?> >
                                Mailtrap (Testing)
                            </option>
                            <option value="custom" <?php selected($global_settings['mail_driver'] ?? 'mailtrap', 'custom'); ?> >
                                Custom SMTP
                            </option>
                        </select>
                        <p class="description">Choose your email delivery method</p>
                    </td>
                </tr>
            </table>
            <!-- Mailtrap Settings -->
            <div id="mailtrap-settings" style="display: <?php echo ($global_settings['mail_driver'] ?? 'mailtrap') === 'mailtrap' ? 'block' : 'none'; ?>;">
                <h3>Mailtrap Configuration</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="mailtrap_username">Username</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="mailtrap_username"
                                name="mailtrap_username"
                                value="<?php echo esc_attr($global_settings['mailtrap_username'] ?? ''); ?>"
                                class="regular-text"
                            />
                            <p class="description">Your Mailtrap inbox username</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="mailtrap_password">Password</label>
                        </th>
                        <td>
                            <input
                                type="password"
                                id="mailtrap_password"
                                name="mailtrap_password"
                                value="<?php echo esc_attr($global_settings['mailtrap_password'] ?? ''); ?>"
                                class="regular-text"
                            />
                            <p class="description">Your Mailtrap inbox password</p>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- Custom SMTP Settings -->
            <div id="custom-smtp-settings" style="display: <?php echo ($global_settings['mail_driver'] ?? 'mailtrap') === 'custom' ? 'block' : 'none'; ?>;">
                <h3>Custom SMTP Configuration</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="smtp_host">SMTP Host</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="smtp_host"
                                name="smtp_host"
                                value="<?php echo esc_attr($global_settings['smtp_host'] ?? ''); ?>"
                                class="regular-text"
                                placeholder="smtp.gmail.com"
                            />
                            <p class="description">SMTP server hostname</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="smtp_port">SMTP Port</label>
                        </th>
                        <td>
                            <input
                                type="number"
                                id="smtp_port"
                                name="smtp_port"
                                value="<?php echo esc_attr($global_settings['smtp_port'] ?? '587'); ?>"
                                class="small-text"
                                min="1"
                                max="65535"
                            />
                            <p class="description">SMTP port (587 for TLS, 465 for SSL, 25 for unencrypted)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="smtp_security">Security</label>
                        </th>
                        <td>
                            <select id="smtp_security" name="smtp_security">
                                <option value="tls" <?php selected($global_settings['smtp_security'] ?? 'tls', 'tls'); ?> >
                                    TLS (recommended)
                                </option>
                                <option value="ssl" <?php selected($global_settings['smtp_security'] ?? 'tls', 'ssl'); ?> >
                                    SSL
                                </option>
                                <option value="none" <?php selected($global_settings['smtp_security'] ?? 'tls', 'none'); ?> >
                                    None (not recommended)
                                </option>
                            </select>
                            <p class="description">Encryption method</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="smtp_username">Username</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="smtp_username"
                                name="smtp_username"
                                value="<?php echo esc_attr($global_settings['smtp_username'] ?? ''); ?>"
                                class="regular-text"
                            />
                            <p class="description">SMTP authentication username</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="smtp_password">Password</label>
                        </th>
                        <td>
                            <input
                                type="password"
                                id="smtp_password"
                                name="smtp_password"
                                value="<?php echo esc_attr($global_settings['smtp_password'] ?? ''); ?>"
                                class="regular-text"
                            />
                            <p class="description">SMTP authentication password</p>
                        </td>
                    </tr>
                </table>
            </div>
            <script>
            function toggleMailSettings() {
                const driver = document.getElementById('mail_driver').value;
                const mailtrapSettings = document.getElementById('mailtrap-settings');
                const customSettings = document.getElementById('custom-smtp-settings');
                if (driver === 'mailtrap') {
                    mailtrapSettings.style.display = 'block';
                    customSettings.style.display = 'none';
                } else {
                    mailtrapSettings.style.display = 'none';
                    customSettings.style.display = 'block';
                }
            }
            </script>

            <h2>Admin Email BCC</h2>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="admin_emails_enabled">Enable Admin BCC</label>
                    </th>
                    <td>
                        <input
                            type="checkbox"
                            id="admin_emails_enabled"
                            name="admin_emails_enabled"
                            value="1"
                            <?php checked($global_settings['admin_emails_enabled'] ?? false); ?>
                        />
                        <label for="admin_emails_enabled">Send BCC to admin emails on all form submissions</label>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="admin_emails">Admin Emails</label>
                    </th>
                    <td>
                        <input
                            type="text"
                            id="admin_emails"
                            name="admin_emails"
                            value="<?php echo esc_attr($global_settings['admin_emails'] ?? ''); ?>"
                            class="regular-text"
                            placeholder="admin1@example.com, admin2@example.com"
                        />
                        <p class="description">Comma-separated list of emails to BCC on all form submissions</p>
                    </td>
                </tr>
            </table>

            <?php submit_button('Save Mail Settings'); ?>
        </form>
    </div>
    <?php
}
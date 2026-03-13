// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mod Merkezi JS Loaded');
    
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Profile image preview (if needed)
    const profileInput = document.getElementById('profile_image');
    if (profileInput) {
        profileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = document.getElementById('profileImagePreview');
                    if (preview) preview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
});

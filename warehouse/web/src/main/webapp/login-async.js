$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        var $form = $(this);
        var url = $form.attr('action');
        var formData = $form.serialize();

        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data.result) {
                    window.location.href = "secured/profile.html";
                } else {
                    alert("Érvénytelen belépési adatok!");
                }
            },
            error: function () {
                alert("Hiba történt a kérés során!");
            }
        });
    });
});

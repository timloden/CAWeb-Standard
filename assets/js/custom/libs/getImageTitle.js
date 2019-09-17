jQuery( document ).ready( function() {
	var path = 'http://ltglocal.ca.gov/wp-content/uploads/2019/04/CGTN-LGEK-Photo.jpg';
	
	jQuery.ajax({
        type: "POST",
        url: "/wp-admin/admin-ajax.php",
        data: {
            action: 'get_image_title_by_id',
            filePath: path
        },
        success: function (output) {
           console.log(output);
        }
        });
    });

});

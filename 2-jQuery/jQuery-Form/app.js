$(function () {

    var allPosts = [
        { name: 'Pen', comment: 'Good' },
        { name: 'Book', comment: 'jQuery' }
    ];
    // render all post
    var allPostDiv = $('#all-posts');
    function renderAllPosts() {
        allPostDiv.children().remove();
        allPosts.forEach(function (post) {

            var postTemplate = `
            <div class="list-group-item">
                <div class="alert alert-info">
                     Name: <span class="badge bg-primary">${post.name}</span>
                     <hr/>
                      <p>${post.comment}</p>
                </div>

            </div>
            
            
            `
            allPostDiv.append(postTemplate);
        })

    }



    $('#post-form').on('submit', function (e) {
        e.preventDefault();

        // read values from a form
        var nameField = $('#post-form-name', $(this));
        var commentField = $('#post-form-comment', $(this));

        // Validate
        var name = nameField.val();
        if (!name) {
            nameField
                .after($('<div class="text-danger"> Name is Required </div>'))
                .closest('div')
            return;
        }

        // Assign in JSON format
        var newPost = {
            name: nameField.val(),
            comment: commentField.val()
        }

        console.log(newPost);
        allPosts.push(newPost);
        renderAllPosts();

    })
})
$(function () {

    var allPosts = [];

    // api server url
     var apiUrl ="http://49.207.3.199:3000/api/posts";

    // render all post
    var allPostDiv = $('#all-posts');

    // load all posts from server side through XHR (AJAX) call

    $.ajax(apiUrl,{
        method:'GET',
        success:function (posts){
            allPosts=posts;
            renderAllPosts();
        },
        error:function (e){
            console.log(">>>>> Invalid Request <<<<<<");
            console.log(e);
        }
    })


    function renderAllPosts() {
        allPostDiv.children().remove();
        allPosts.forEach(function (post) {

            var postTemplate = `
            <div class="list-group-item">
                <div class="alert alert-info" data-id="${post.id}">
                     Name: <span class="badge bg-primary">${post.name}  </span> 
                     <span class=''>
                     <i class="bi bi-trash" id="post-delete"></i>
                     <i class="bi bi-pencil-square" id="post-update"></i>
                     </span>

                     <hr/>
                     <span class="">${post.comment}  </span> 

                </div>

            </div>
            `
            allPostDiv.append(postTemplate);
        })

    }

   


    $('#all-posts').on('click','#post-delete',function(){
        apiUrl+"/"+id
       // console.log('... deleted');
       var id= $(this).closest('div').data('id');
       var deleteUrl=apiUrl+"/"+id
      //  console.log(deleteUrl);
      // console.log(id);

       $.ajax(deleteUrl,{
           method:'DELETE',
           success:function(count){
            console.log(count);
           },
           error:function(e){
               console.log('Not Deleted because of '+e);
           }
       });

      allPosts= allPosts.filter(function(post){
           return post.id!==id;
       });
       renderAllPosts();

    })


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

        // posting new post to api server though xhr (AJAX) call

        $.ajax(apiUrl,{
            method: 'POST',
            contentType:'application/json',
            data:JSON.stringify(newPost),
            success:function(post){
                allPosts.push(newPost);
                renderAllPosts();
            }
        });

        nameField.val('').focus();
        commentField.val('');

    })
})
// When the document is ready...
$(function() {

    // Add click event to button with class getAllUsers
    $(".getAllUsers").on("click", function() {
        $.get("/api/users", function (data, status) {
            console.log(data)
            $("#lastMessage").html(data.htmlMessage);

            var $li = $("<li></li>").html(data.htmlMessage).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    // Add click event to button with class getOneUser
    $(".getOneUser").on("click", function() {
        $.get(`/api/users/99`, function (data, status) {
            console.log(data)
            $("#lastMessage").html(data.htmlMessage);

            var $li = $("<li></li>").html(data.htmlMessage).addClass("eventListItem");
            $("#eventList").append($li);
        });
    });

    $("#eventList").on("click", "li", function() {
        let $this = $(this);
        $this.css("color", "red");
    })
});

$(function () {
    console.log("test")

    $(".create-form").on("submit", function (event) {
        console.log("test_create")
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: 0
        };
        $.post("/api/burgers", newBurger).then(function (data) {
            console.log(data);
            location.reload();
        });
        $("#burger").val("");
    });

    $(".change-devoured").on("click", function (event) {
        console.log("updated test")
        var id = $(this).data("id");
        //var cust = $(this).data("customer_name");
        var cust = $("#customer_name").val();
        //var cust = $('#textBox'+id).val().trim()
        console.log("cutomer======" + cust);
        //alert(cust);
        var newDevoured = $(this).data("newdevoured");
        var newDevouredState = {
            devoured: true,
            customer_name: cust
        };
        //send the PUT request..
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("changed devoured to ", newDevoured);
                //reload the page to get the updated list..
                location.reload();

            }
        );

    });
});
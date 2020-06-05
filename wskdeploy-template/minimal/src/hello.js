function main(params) {
    msg = "Hello, " + params.name + " from " + params.place;
    family = "You have " + params.children + " children ";
    stats = "and are " + params.height + " m. tall.";
    return { greeting:  msg, details: family + stats };
}

// Currently pinging the ESP's web server on port 80
// The magic command "AA" is used to filter out other web servers which may reply with
// HTTP 200 codes (404's are handled by the error function).


function sendRequest(requestIp, martylist, timeout) {
    if (timeout === undefined) timeout = 10000;
    $.ajax({
        type:'GET',
        url:"http://" + requestIp + "/service-discovery", 
        success:function(data) {
            
            // Something replied!

            var magic_signature = data.substring(0, 2); // [0, 1]
            var marty_name = data.substring(2);     // [2, ...]

            if (magic_signature == "AA") {
                martylist.push([requestIp, marty_name]);
                //$('#response').append('<span class="text-success">[+] ' + requestIp + ": " +  marty_name + '</span><br/>');
            } else {
                //$('#response').append('<span class="text-danger">[-] ' + requestIp + '</span><br/>');
            }
            if (typeof scanResults === "number"){
                scanResults++;
            }

        },
        cache: false,
        error:function(jqXHR, textStatus, errorThrown) {
            // Nothing there
            //$('#response').append("[ ] " + requestIp + "<br/>");
            if (typeof scanResults === "number"){
                scanResults++;
            }
        },
        timeout: timeout // we want to give the ESP a fair chance of replying
    });
}

function scanRange(ip, martylist, timeout) {
    if (timeout === undefined) timeout = 10000;
    //$('#response').empty()
    //var ip = document.getElementById("ip").value;
    if (typeof scanResults === "number"){
        scanResults=0;
    }
    for (i = 0; i <= 255; i++) {
        sendRequest(ip + "." + i, martylist, timeout);
    }             
}
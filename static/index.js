$(document).ready(() => {

    $('#get_data').on('click', function() {
        $.ajax({
            // url: 'http://127.0.0.1:5000/get_data', 
            url: 'http://34.254.91.76:5000/get_data',
            method: 'GET',
            success: function(response) {
                // Age
                for(var i=0;i<response["age"].length;i++){
                    var row = '<tr>' +
                            '<td>' + response["age"][i][0] + '</td>' +
                            '<td>' + response["age"][i][1] + '</td>' +
                            '</tr>';
                    $(".age_body").append(row);
                }

                var labels = [];
                var values = [];
                response["age"].forEach(function(item) {
                    labels.push(item[0]);
                    values.push(item[1]);
                });
                var ctx = document.getElementById('age_chart').getContext('2d');
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });

                // Bmi
                for(var i=0;i<response["bmi"].length;i++){
                    var row = '<tr>' +
                            '<td>' + response["bmi"][i][0] + '</td>' +
                            '<td>' + response["bmi"][i][1] + '</td>' +
                            '</tr>';
                    $(".bmi_body").append(row);
                }

                var labels = [];
                var values = [];
                response["bmi"].forEach(function(item) {
                    labels.push(item[0]);
                    values.push(item[1]);
                });
                var ctx = document.getElementById('bmi_chart').getContext('2d');
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });

                // Statistics
                for(var i=0;i<response["statistics"].length;i++){
                    var row = '<tr>' +
                            '<td>' + response["statistics"][i][0] + '</td>' +
                            '<td>' + response["statistics"][i][1] + '</td>' +
                            '</tr>';
                    $(".statistics_body").append(row);
                }

                // Diabetes
                for(var i=0;i<10;i++){
                    var row = '<tr>' +
                            '<td>' + response["diabetes"][i][0] + '</td>' +
                            '<td>' + response["diabetes"][i][1] + '</td>' +
                            '<td>' + response["diabetes"][i][4] + '</td>' +
                            '<td>' + response["diabetes"][i][5] + '</td>' +
                            '<td>' + response["diabetes"][i][6] + '</td>' +
                            '<td>' + response["diabetes"][i][7] + '</td>' +
                            '<td>' + response["diabetes"][i][8] + '</td>' +
                            '</tr>';
                    $(".diabetes_body").append(row);
                }
            }
        });
    });

})
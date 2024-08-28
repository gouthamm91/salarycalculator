function calculateTax(args) {
    var amt = args[0]; var threshold1 = args[1]; var threshold2 = args[2]; var rate = args[3];
    if (amt >= threshold1 && amt < threshold2) {
        return Math.abs(Number(amt) - Number(threshold1)) * Number(rate);
    } else if (amt > threshold1 && amt >= threshold2) {
        return Math.abs(Number(threshold2) - Number(threshold1)) * Number(rate);
    } else {
        return 0;
    }
}

function calculateBreakup() {
    const location = document.getElementById('location').value;
    const ctc = parseFloat(document.getElementById('ctc').value);

    if (isNaN(ctc) || ctc <= 0) {
        document.getElementById('result').innerHTML = 'Please enter a valid CTC.';
        return;
    }

    let taxRate = 0;

    switch(location) {
        case 'india':
            parameters = [[ctc, 300000, 500000, 0.05], [ctc, 500000, 600000, 0.05], [ctc, 600000, 900000, 0.10], [ctc, 900000, 1000000, 0.15], [ctc, 1000000, 1200000, 0.15], [ctc, 1200000, 1500000, 0.20], [ctc, 1500000, 999999999999999, 0.30]];
            // taxRate = 0.3;
            var components = [[ctc, 1, 999999999999999, 0.12, 'Employee Provident Fund (EPF)'], 
                           [ctc, 1, 999999999999999, 0.0075, 'Employee State Insurance (ESI)']]
            break;
        case 'amsterdam':
            parameters = [[ctc, 1, 37149, 0.0928], [ctc, 37150, 73031, 0.3693], [ctc, 73031, 999999999999999, 0.495]];
            // taxRate = 0.4;
            var components = [[ctc, 1, 999999999999999, 0.2765, 'Social Security Contributions'], 
                           [ctc, 1, 999999999999999, 0.06, 'Pension Contributions'], 
                           [ctc, 1, 999999999999999, 0.07, 'Health Insurance']]
            break;
        case 'london':
            parameters = [[ctc, 5000, 37700, 0.20], [ctc, 37701, 150000, 0.45], [ctc, 150000, 999999999999999, 0.45]];
            // taxRate = 0.45;
            var components = [[ctc, 1, 999999999999999, 0.07, 'National Insurance Contributions (NICs)'], 
                           [ctc, 1, 999999999999999, 0.05, 'Pension Contributions'], 
                           [ctc, 1, 999999999999999, 0.075, 'Student Loan Repayments']]
            break;
        case 'france':
        case 'paris':
            parameters = [[ctc, 10778, 27478, 0.11], [ctc, 27479, 78570, 0.30], [ctc, 78571, 168994, 0.41], [ctc, 168995, 999999999999999, 0.45]];
            // taxRate = 0.5;
            var components = [[ctc, 1, 999999999999999, 0.22, 'Social Security Contributions'], 
                           [ctc, 1, 999999999999999, 0.085, 'Pension Contributions'], 
                           [ctc, 1, 999999999999999, 0.08, 'Health Insurance']]
            break;
        case 'poland':
            parameters = [[ctc, 30000, 120000, 0.12], [ctc, 120000, 999999999999999, 0.32]];
            // taxRate = 0.32;
            var components = [[ctc, 1, 999999999999999, 0.1371, 'Social Security Contributions'], 
                           [ctc, 1, 999999999999999, 0.0245, 'Labor Fund'], 
                           [ctc, 1, 999999999999999, 0.09, 'Health Insurance']]
            break;
        case 'washington':
        case 'new_york':
        case 'los_angeles':
            parameters = [[ctc, 1, 999999999999999, 0.0929]];
            // taxRate = 0.35;
            var components = [[ctc, 1, 999999999999999, 0.062, 'Social Security Contributions'], 
                           [ctc, 1, 999999999999999, 0.0045, '401(k) Contributions'], 
                           [ctc, 1, 999999999999999, 0.0145, 'Medicare Contributions']]
            break;
        default:
            taxRate = 0;
            var components = [[]];
    }

    var tax = 0;
    for (t=0; t<parameters.length; t++) {
        var tax = tax + calculateTax(parameters[t]);
    }

    var componentAmt = 0;
    var componentsStr = '';
    var amt = 0;
    for (c=0; c<components.length; c++) {
        var amt = calculateTax(components[c]);
        var componentAmt = componentAmt + Number(amt);
        var componentsStr = componentsStr + '<BR>' + components[c][4] + ' = ' + Math.round(Number(amt), 2);
    }
    var componentsStr = componentsStr + '<BR><B>' + 'Total Components' + '</B>: ' + Math.round(componentAmt);


    // const tax = ctc * taxRate;
    const netSalary = ctc - tax - componentAmt;
    const monthlySalary = netSalary / 12;



    document.getElementById('result').innerHTML = `
        <h2>Breakup for ${location.charAt(0).toUpperCase() + location.slice(1).replace('_', ' ')}</h2>
        <p>Gross CTC: ${ctc.toFixed(2)}</p>
        <p>Tax Deducted: ${tax.toFixed(2)}</p>
        <p>Components: ${componentsStr}</p>
        <p>Net Annual Salary: ${netSalary.toFixed(2)}</p>
        <p>Net Monthly Salary: ${monthlySalary.toFixed(2)}</p>
    `;
}

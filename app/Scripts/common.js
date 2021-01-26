if (window["Globalize"])
    Globalize.culture("vi-VN");

if (window["moment"])
    moment.locale("vi-VN");

var strips = ["áàảãạăắằẳẵặâấầẩẫậ", "ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ", "đ", "Đ", "éèẻẽẹêếềểễệ", "ÉÈẺẼẸÊẾỀỂỄỆ", "íìỉĩị", "ÍÌỈĨỊ", "óòỏõọơớờởỡợôốồổỗộ", "ÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘ",
    "ưứừửữựúùủũụ", "ƯỨỪỬỮỰÚÙỦŨỤ", "ýỳỷỹỵ", "ÝỲỶỸỴ"];

var replacements = ['a', 'A', 'd', 'D', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', 'y', 'Y'];

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// Set form validate
// resetForm("#formId");
var resetForm = function (selector) {
    var $form = $(selector);

    $form.validate().resetForm();
    $form.find("[data-val]").removeClass("input-validation-error").addClass("valid");
    $form.find("[data-valmsg-replace]").removeClass("field-validation-error").addClass("field-validation-valid").empty();

    return $form;
};

////Fix the number validator to use globalized methods
//$.validator.methods.number = function (value, element) {
//    return this.optional(element) ||
//        !isNaN(Globalize.parseFloat(value));
//}

////Fix the date validator to use globalized methods
//$.validator.methods.date = function (value, element) {
//    return this.optional(element) ||
//        Globalize.parseDate(value);
//}

//Fix the range validator to use globalized methods
//jQuery.extend(jQuery.validator.methods, {
//    range: function (value, element, param) {
//        var val = Globalize.parseFloat(value);
//        return this.optional(element) || (val >= param[0] && val <= param[1]);
//    }
//});

// Lấy ra Quý từ tháng
function GetQuarter(month) {
    return (month - 1) / 3 + 1;
}

// Kiểm tra email hợp lệ
function CheckEmailFormat(email) {
    var regex = new RegExp("^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$");

    return regex.test($.trim(email));
};

// Định dạng số
function formatNumberic(value, ext) {
    if (isNaN(value)) {
        return "";
    }

    if (parseFloat(value) === 0) {
        return "0";
    }

    if (ext == undefined)
        ext = "N0";

    if (value == null || value === "") {
        return "";
    }

    var radixPoint = Globalize.culture().numberFormat['.'];

    value = Globalize.format(value, ext).toString();
    if (value.split(radixPoint)[1] === "0000" || value.split(radixPoint)[1] === "000" || value.split(radixPoint)[1] === "00" || value.split(radixPoint)[1] === "0") {
        value = value.split(radixPoint)[0];
    }
    return value;
}

//fomatVietNam
function formatVN(value) {
    if (value) {
        value = value.replace(/,/g, "");
        value = value.replace(".", ",");
        return value;
    }
    return "";
}


// Format string dạng tham số
// ReSharper disable once NativeTypePrototypeExtending
String.prototype.format = function () {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
}


// ReSharper disable once NativeTypePrototypeExtending
String.prototype.toLowerCaseFirst = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

function stripVietnameseChars(input) {
    var stringBuilder = [];
    for (var k = 0; k < input.length; k++) {
        stringBuilder.push(input.charAt(k));
    }
    for (var i = 0; i < stringBuilder.length; i++) {
        for (var j = 0; j < strips.length; j++) {
            if (strips[j].indexOf(stringBuilder[i]) > -1) {
                stringBuilder[i] = replacements[j];
            }
        }
    }
    return stringBuilder.join("");
};

// Chuyển đổi số sang số la mã
function romanize(num) {
    if (!+num)
        return '';
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

// khởi tạo mảng số
var strName = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

// Hàm chuyển đổi hàng chục và hàng đơn vị
function convertUnitsToString(number, isRedundant) {
    var str = "";
    var dozens = Math.floor(number / 10);
    var unit = number % 10;
    if (dozens > 1) {
        str = " " + strName[dozens] + " mươi";
        if (unit === 1) {
            str += " mốt";
        }
    } else if (dozens === 1) {
        str = " mười";
        if (unit === 1) {
            str += " một";
        }
    } else if (isRedundant && unit > 0) {
        str = " lẻ";
    }
    if (unit === 5 && dozens > 1) {
        str += " lăm";
    } else if (unit > 1 || (unit === 1 && dozens === 0)) {
        str += " " + strName[unit];
    }
    return str;
}

// Hàng chuyển đổi hàng trăm
function convertHundredsToString(number, isRedundant) {
    var str;
    var hundred = Math.floor(number / 100);
    number = number % 100;
    if (isRedundant || hundred > 0) {
        str = " " + strName[hundred] + " trăm";
        str += convertUnitsToString(number, true);
    } else {
        str = convertUnitsToString(number, false);
    }
    return str;
}

// Hàm chuyển đổi hàng triệu
function convertMillionsToString(number, isRedundant) {
    var str = "";
    var million = Math.floor(number / 1000000);
    number = number % 1000000;
    if (million > 0) {
        str = convertHundredsToString(million, isRedundant) + " triệu";
        isRedundant = true;
    }
    var thousand = Math.floor(number / 1000);
    number = number % 1000;
    if (thousand > 0) {
        str += convertHundredsToString(thousand, isRedundant) + " nghìn";
        isRedundant = true;
    }
    if (number > 0) {
        str += convertHundredsToString(number, isRedundant);
    }
    return str;
}


function NumericToVNamese(number) {
    if (number == 0) {
        return "không";
    }
    else if (number == 1) {
        return "một";
    }
    else if (number == 2) {
        return "hai";
    }
    else if (number == 3) {
        return "ba";
    }
    else if (number == 4) {
        return getLanguageText('ScriptFour');
    } else if (number == 5) {
        return "năm";
    }
    else if (number == 6) {
        return "sáu";
    }
    else if (number == 7) {
        return getLanguageText('ScriptSeven');
    }
    else if (number == 8) {
        return "tám";
    }
    else if (number == 9) {
        return getLanguageText('ScriptNine');
    }
}


function numbersonly(myfield, e, dec) {
    var key;
    var keychar;

    if (window.event)
        key = window.event.keyCode;
    else if (e)
        key = e.which;
    else
        return true;

    e = e || window.event; // IE support
    var ctrlDown = e.ctrlKey || e.metaKey; // Mac support

    // Check for Alt+Gr (http://en.wikipedia.org/wiki/AltGr_key)
    if (ctrlDown && e.altKey) return true;
    else if (key === 37 || key === 39 || key === 8) return true;// left, right, back
    // Check for ctrl+c, v and x
    else if (ctrlDown && e.keyCode === 65) return true;// c
    else if (ctrlDown && e.keyCode === 67) return true; // c
    else if (ctrlDown && e.keyCode === 86) return true; // v
    else if (ctrlDown && e.keyCode === 88) return true; // x

    if (e.keyCode === 35 || e.keyCode === 36) {
        myfield.focus();
        myfield.select();

        return true;
    }

    keychar = String.fromCharCode(key);

    // control keys
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 27)) {
        return true;
    }
    else if (key == 13) {
        return false;
    }
    // numbers
    else if ((("0123456789.,-").indexOf(keychar) > -1))
        return true;

    // decimal point jump
    else if (dec && (keychar == "." || keychar == ",")) {
        myfield.form.elements[dec].focus();
        return false;
    }
    else
        return false;
}

// hàm chuyển đổi hàng tỷ
function convertMoneyToString(number) {
    if (number === 0) return strName[0] + " đồng";
    var str = "", suffixe = "";

    do {
        var billion = number % 1000000000;
        number = Math.floor(number / 1000000000);
        if (number > 0) {
            str = convertMillionsToString(billion, true) + suffixe + str;
        } else {
            str = convertMillionsToString(billion, false) + suffixe + str;
        }
        suffixe = " tỷ";
    } while (number > 0);

    var stringMoney = str + " đồng";
    stringMoney = stringMoney.trim();

    return stringMoney.substring(0, 1).toUpperCase() + stringMoney.substring(1, stringMoney.length);
}

// hàm cắt chuỗi
function substring(str, number) {
    var rt = str.substring(1, number);
    if (str.length > number) {
        rt + '...';
    }
    return rt;
}

function onlyNumber(e) {
    if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode == 8) {
        return true;
    }
    return false;
}

function renderItemUserAutocomplete(ul, item) {
    var html = '<div class="media-left"><a class="" href="javascript:;">\
                        <img style="width: 40px;" class="media-object img-circle" src="/Upload/Resize/' + (item.Image ? item.Image : 'L0NvbnRlbnQvaW1hZ2VzL25vbmUuanBn') + '_50x50_0' + '" alt="...">\
                    </a></div>\
                    <div class="media-body">\
                        <h4 class="media-heading">' + item.FullName + ' <span>(' + item.UserName + ')</span></h4>\
                        {span}\
                    </div>';
    if (item.TitleName != null && item.OfficeName != null) {
        html = html.replace(/{span}/ig, "<span>" + item.TitleName + " - " + item.OfficeName + "</span>");
    }

    return $("<li>").addClass('media')
        .append(html)
        .appendTo(ul).addClass('autoMember').addClass('media-list');
};

function viewReport(url) {
    var previewUrl = '/Home/PreviewReport?url=' + encodeURIComponent(url);
    $.ajax({
        type: "GET",
        url: previewUrl,
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        success: function (rs, status, xhr) {
            $('body').append(rs);
        },
        error: function (xhr, status, error) {
            console.log(error);
            toastr.error(error);
        }
    });
}

function viewReportParam(urlAction, param) {
    var previewUrl = '/Home/PreviewReportParam';
    $.ajax({
        type: "POST",
        url: previewUrl,
        data: {
            url: urlAction,
            param: param,
        },
        success: function (rs, status, xhr) {
            //$('body').html();
            $('body').append(rs);
        },
        error: function (xhr, status, error) {
            console.log(error);
            toastr.error(error);
        }
    });
}

function viewReportInNewWindow(url) {
    var params = [
        'left=0',
        'top=0',
        'height=' + window.outerHeight,
        'width=' + window.outerWidth,
        'fullscreen=yes' // only works in IE, but here for completeness
    ].join(',');
    console.log(params);
    var randomnumber = Math.floor((Math.random() * 100) + 1);
    var popup = window.open(url, "_blank", 'popup_window', randomnumber, params);
}

function downloadFileFromPath(path) {
    if (path.endsWith('.pdf')) {
        var downloadUrl = '/Files/ViewByPath?path=' + encodeURIComponent(path);
        viewReport(downloadUrl);
    }
    else {
        var downloadUrl = '/Files/GetByPath?path=' + encodeURIComponent(path);
        window.open(downloadUrl, "_blank");
    }
}
        

function quickAdd(url, callbackFunctionName) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        success: function (rs, status, xhr) {
            rs = rs.replace('callbackFunctionName', callbackFunctionName);
            $('body').append(rs);
        },
        error: function (xhr, status, error) {
            console.log(error);
            toastr.error(error);
        }
    });
}

function OnchangeKeywords(element) {
    var value = $(element).val();
    if (value != '') {
        $(element).val(value.trim());
    }
}

$(document).ajaxComplete(function (event, xhr) {
    // Lỗi Server (500)
    if (xhr && xhr.readyState === 4 && xhr.status === 500) {
        swal({
            title: getLanguageText('ScriptTheresSomethingNotRight'),
            text: getLanguageText('ScriptPleaseContactTheSystemAdministrator'),
            type: 'error',
            confirmButtonText: getLanguageText('GlobalButtonClose'),
            allowOutsideClick: false
        });
        return;
        // Lỗi Server (401)
    } else if (xhr && xhr.readyState === 4 && xhr.status === 401) {
        window.reLogin();
        return;
        // Lỗi Server (404)
    } else if (xhr && xhr.readyState === 4 && xhr.status === 404) {
        swal({
            title: getLanguageText('ScriptDataDoesNotExist'),
            text: getLanguageText('ScriptTheDataYouRequestedNoLongerExistsOrHasBeenDeleted'),
            type: 'error',
            confirmButtonText: getLanguageText('GlobalButtonClose'),
            allowOutsideClick: false
        });
        return;
        // Xử lý không có quyền truy cập hệ thống
    } else if (xhr && xhr.readyState === 4 && xhr.status === 200 && xhr.responseJSON && xhr.responseJSON.status === -123
    ) {
        swal({
            title: getLanguageText('ScriptYouDontHaveAccess'),
            text: xhr.responseJSON.text,
            type: 'warning',
            confirmButtonText: getLanguageText('GlobalButtonClose'),
            allowOutsideClick: false
        });
        return;
    }
    return;
});
window.reLogin = function () {
    window.location.reload();
}


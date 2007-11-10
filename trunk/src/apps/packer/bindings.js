
var packer = new Packer;

new base2.JSB.RuleList({
  "#form": {
    ondocumentready: function() {
      this.removeClass("disabled");
      output.value = "";
      this.ready();
    },
    
    ready: function() {
      message.write("ready");
      input.focus();
    }
  },
  "#input,#output": {
    disabled: false,
    spellcheck: false // for mozilla
  },
  "#clear-all": {
    disabled: false,
    
    onclick: function() {
      input.value = "";
      output.value = "";
      form.ready();
    }
  },
  "#pack-script": {
    disabled: false,
    
    onclick: function() {
      try {
        output.value = "";
        if (input.value) {
          var value = packer.pack(input.value, base62.checked, shrink.checked, privates.checked);
          output.value = value;
          message.update();
        }
      } catch (error) {
        message.error("error packing script", error);
      } finally {
        decodeScript.disabled = !output.value || !base62.checked;
      }
    }
  },
  "#decode-script": {    
    onclick: function() {
      try {
        if (output.value) {
          var start = new Date;
          eval("var value=String" + output.value.slice(4));
          var stop = new Date;
          output.value = value;
          message.update("unpacked in " + (stop - start) + " milliseconds");
        }
      } catch (error) {
        message.error("error decoding script", error);
      } finally {
        decodeScript.blur();
        decodeScript.disabled = true;
      }
    }
  },
  "#base62,#shrink,#privates": {
    disabled: false
  },
  "#message": {
    error: function(text, error) {
      this.write(text + ": " + error.message, "error");
    },
    
    update: function(message) {
      var length = input.value.length;
      if (!/\r/.test(input.value)) { // mozilla trims carriage returns
        length += match(input.value, /\n/g).length;
      }
      var calc = output.value.length + "/" + length;
      var ratio = (output.value.length / length).toFixed(3);
      this.write((message ? message + ", " : "") + format("compression ratio: %1=%2", calc, ratio));
    },
    
    write: function(text, className) {
      this.innerHTML = text;
      this.className = className || "";
    } 
  }
});

if (!(0).toFixed) Number.prototype.toFixed = function(n) {
  var e = Math.pow(10, n);
  var r = String(Math.round(this * e));
  if (r == 0) for (var i = 0; i < n; i++) r += "0";
  return r.slice(0, r.length - n) + "." + r.slice(r.length - n);
};

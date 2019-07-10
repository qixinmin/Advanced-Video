import RTCClient from './rtc-client';
import {Toast, getDevices, serializeFormData, validator, isSafari, isCompatibleChrome, isFirefox} from './common';
import "./assets/style.scss";
import * as bs from 'bootstrap-material-design';


$(() => {
  let selects = null;

  $('body').bootstrapMaterialDesign();
  $("#settings").on("click", function (e) {
    e.preventDefault();
    $("#settings").toggleClass("btn-raised");
    $('#setting-collapse').collapse();
  });

  getDevices(function (devices) {
    selects = devices;
    devices.audios.forEach(function (audio) {
      $('<option/>', {
        value: audio.value,
        text: audio.name,
      }).appendTo("#microphoneId");
    })
    devices.videos.forEach(function (video) {
      $('<option/>', {
        value: video.value,
        text: video.name,
      }).appendTo("#cameraId");
    })
  })

  if (isSafari()) {
    Toast.error("Safari not support screen sharing")
    $("#join").prop("disabled", true)
  }

  const fields = ['appID', 'channel'];

  let rtc = new RTCClient();

  $("#join").on("click", function (e) {
    e.preventDefault();
    console.log("join")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.join(params).then(() => {
        rtc.publish();
      })
    }
  })

  $("#publish").on("click", function (e) {
    e.preventDefault();
    console.log("startLiveStreaming")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.publish();
    }
  });

  $("#unpublish").on("click", function (e) {
    e.preventDefault();
    console.log("stopLiveStreaming")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.unpublish();
    }
  });

  $("#leave").on("click", function (e) {
    e.preventDefault();
    console.log("leave")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.leave();
    }
  })

  $("#startSharing").on("click", function (e) {
    e.preventDefault();
    console.log("startSharing")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.startScreenSharing()
    }
  })

  $("#stopSharing").on("click", function (e) {
    e.preventDefault();
    console.log("stopSharing")
    const params = serializeFormData();
    if (validator(params, fields)) {
      rtc.stopScreenSharing();
    }
  })
})
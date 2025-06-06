const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  Imgurl: String,

  Product_name: String,
  Weight: String,

  Dimensions: [String],
  Area: String,
  Screen_to_body_ratio: String,
  Side_bezels: String,
  Colors: String,
  Material: String,
  Transformer: String,
  Opening_angle: String,

  Cooling_system: String,
  Vapor_chamber: String,
  Liquid_metal: String,
  Number_of_fans: String,
  Noise_level: String,

  Display_size: String,
  Display_type: String,
  Display_refresh_rate: String,
  Display_adaptive_refresh_rate: String,
  Display_PPI: String,
  Display_aspect_ratio: String,
  Display_resolution: String,
  Display_HDR_support: String,
  Display_sync_technology: String,
  Display_touchscreen: String,
  Display_coating: String,
  Display_ambient_light_sensor: String,

  Battery_capacity: String,
  Battery_full_charging_time: String,
  Battery_type: String,
  Battery_replaceable: String,
  Battery_fast_charging: String,
  Battery_Charging_via_USB: String,
  Battery_charging_port_position: String,
  Battery_charge_power: String,
  Battery_cable_length: String,
  Battery_Weight_of_AC_adapter: String,

  CPU_name: String,
  CPU_base_frequency: String,
  CPU_turbo_frequency: String,
  CPU_cores: String,
  CPU_threads: String,
  CPU_cache: String,
  CPU_integrated_GPU: String,
  CPU_fabrication_process: String,

  Gc_GPU_name: String,
  Gc_TGP: String,
  Gc_Type: String,
  Gc_fabrication_process: String,
  Gc_GPU_base_clock: String,
  Gc_GPU_boost_clock: String,
  Gc_FLOPS: String,
  Gc_memory_size: String,
  Gc_memory_type: String,
  Gc_memory_bus: String,
  Gc_memory_speed: String,
  Gc_shading_units: String,
  Gc_texture_mapping_units: String,
  Gc_raster_operations_pipelines: String,

  RAM_size: String,
  RAM_channels: String,
  RAM_clock: String,
  RAM_type: String,
  RAM_upgradable: String,

  Storage_size: String,
  Storage_bus: String,
  Storage_type: String,
  Storage_channels: String,
  Storage_upgradable: String,
  Storage_total_slots: String,
  Storage_NVMe: String,

  Sound_speakers: String,
  Sound_power: String,
  Sound_Dolby_Atmos: String,
  Sound_loudness: String,
  Sound_microphone: String,

  WiFi_standard: String,
  Bluetooth: String,
  Fingerprint: String,
  Infrared_sensor: String,
  Optical_drive: String,

  Webcam: String,
  Webcam_resolution: String,

  Port_USB_A: String,
  Port_USB_Type_C: String,
  Port_Thunderbolt: String,
  Port_HDMI: String,
  Port_DisplayPort: String,
  Port_VGA: String,
  Port_audio_jack: String,
  Port_Ethernet: String,
  Port_SD_card_reader: String,
  Port_proprietary_charging_port: String,

  Input_keyboard_type: String,
  Input_numpad: String,
  Input_backlight: String,
  Input_key_travel: String,

  Touchpad_size: String,
  Touchpad_surface: String,
  Touchpad_windows_precision: String,

  Geekbench_single_core: String,
  Geekbench_multi_core: String,
  Cinebench_single_core: String,
  Cinebench_multi_Core: String,

  Dt_Contrast: String,
  Dt_sRGB_color_space: String,
  Dt_Adobe_RGB_profile: String,
  Dt_DCI_color_gamut: String,
  Dt_Response_time: String,
  Dt_Max_brightness: String,

  Release_date: String,

  Pros: [String],
  Cons: [String],

  Amazon_link: String,
  Flipkart_link: String
});

module.exports = mongoose.model('LaptopCompare', laptopSchema);

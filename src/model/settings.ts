export default interface Settings {
    pomodoro_time          :       number
    shortbreak_time        :       number
    longbreak_time         :       number
    longbreak_interval     :       number

    // 播放铃声 重复次数，取值 1-5
    playing_repeat_count   :       number
    // 播放铃声 声音大小, 取值 0 - 1
    playing_sound_volumes  :       number
}
import { FocusStatus, RunningStatus } from "./status"
import type Settings from "./settings"

class Counter {
    public focus_status: FocusStatus
    public running_status: RunningStatus   

    public countdown_minutes: number
    public countdown_seconds: number
    public current_interval: number
    
    public settings: Settings

    public constructor(settings: Settings) {
        this.settings = settings
        this.current_interval = 0
        this.focus_status = FocusStatus.Pomodoro
        this.running_status = RunningStatus.Paused
        this.countdown_minutes = 0
        this.countdown_seconds = 0
        
        this.set_focus_status(FocusStatus.Pomodoro)
    }

    public reset(settings: Settings): void {
        // Object.assign(this.settings, settings)
        this.settings = settings
        this.current_interval = 0
        this.focus_status = FocusStatus.Pomodoro
        this.running_status = RunningStatus.Paused
        this.countdown_minutes = 0
        this.countdown_seconds = 0
        
        this.set_focus_status(FocusStatus.Pomodoro)
    }

    public countdown_once(): boolean {
        let is_finished = false
        this.countdown_seconds -= 1

        if (this.countdown_seconds == -1) {
            if (this.countdown_minutes == 0) {
                this.countdown_seconds = 0
                this.running_status = RunningStatus.Paused
                is_finished = true
            } else {
                this.countdown_seconds = 59;
                this.countdown_minutes -= 1;
            }
        }

        if (is_finished) {
            if (this.focus_status == FocusStatus.Pomodoro) {
                this.current_interval += 1;

                if (this.current_interval == this.settings.longbreak_interval) {
                    this.set_focus_status(FocusStatus.LongBreak)
                    this.current_interval = 0
                } else {
                    this.set_focus_status(FocusStatus.ShortBreak)
                }
            } else {
                this.set_focus_status(FocusStatus.Pomodoro)
            }
        }

        return is_finished
    }

    public get time_text(): string {
        return `${zero_padding(this.countdown_minutes)}:${zero_padding(this.countdown_seconds)}`;
    }

    
    public set_focus_status(status: FocusStatus) {
        this.focus_status = status
        switch (this.focus_status) {
            case FocusStatus.Pomodoro: {
                this.countdown_minutes = this.settings.pomodoro_time
                break
            }

            case FocusStatus.ShortBreak: {
                this.countdown_minutes = this.settings.shortbreak_time
                break
            }

            case FocusStatus.LongBreak: {
                this.countdown_minutes = this.settings.longbreak_time
                break
            }
        }

        this.running_status = RunningStatus.Paused
        this.countdown_seconds = 0
    }

}

const zero_padding = (value: number): string => {
    if (value < 10) {
        return `0${value}`
    } else {
        return `${value}`
    }
}

export default Counter;
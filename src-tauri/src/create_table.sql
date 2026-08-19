drop table if exists `tasks`;

create table if not exists `tasks` (
    id                      integer primary key,
    title                   varchar(64) not null,
    is_done                 integer not null,
    expect_pomodoro_count   integer not null,
    actual_pomodoro_count   integer not null,
    note                    text default null,
    next_id                 integer,

    foreign key(next_id) references `tasks`(id),

    check (expect_pomodoro_count > 0),
    check (actual_pomodoro_count >= 0),

    check (
        case 
            when next_id is not null then id != next_id
        else
            1
        end
    )
);

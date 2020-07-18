export interface MetraTrainInfo
{
    id: string;
    is_deleted: boolean;
    trip_update: {
        trip: {
            trip_id: string;
            route_id: string;
            direction_id?: number | null;
            start_time: string;
            start_date: string;
            schedule_relationship?: scheduleRelationship | null;
        };
        vehicle: {
            id: string;
            label: string;
            license_plate?: string | null;
        };
        stop_time_update?: (StopTimeUpdate)[] | null;
        timestamp?: Timestamp | null;
        delay?: number | null;
        position?: Position | null;
    };
    vehicle?: number | null;
    alert?: number | null;
}

export interface StopTimeUpdate{
    stop_sequence: number;
    stop_id: string;
    arrivial?: StopTimeEvent | null;    
    departure?: StopTimeEvent | null;
    schedule_relationship?: scheduleRelationship | null;
}

export interface StopTimeEvent{
    delay: number;
    time?: Timestamp | null;
    uncertainty?: number | null; // If this is 0, then the position is certain, otherwise unknown if null
}

export interface Timestamp{
    low: Date | null; //Our time stamp
    high?: number | null;
    unsigned?: boolean | null;
}

//--------------------------------------------------------------------------------------------------------------
//Position stuff

export interface Position{
    id: string;
    is_deleted: boolean;
    trip_update?: any | null;
    vehicle: {
        trip?: TripDescriptor | null;
        vehicle?: VehicleDescriptor | null;
        position?: PositionActual | null;
        current_stop_sequence?: number | null;
        stop_id?: string | null;
        current_status?: vehicleStopStatus | null;
        timestamp?: Timestamp | null;
        congestion_level?: CongestionLevel | null;
        occupancy_status?: OccupancyStatus | null;
    };
    alert?: any | null;
}

export interface TripDescriptor{
    trip_id: string;
    route_id: string;
    direction_id?: number | null;
    start_time: string;
    start_date: string;
    schedule_relationship?: scheduleRelationship | null;
}

export interface VehicleDescriptor{
    id: string;
    label: string;
    license_plate?: string | null;
}

export interface PositionActual{
    latitude: number;
    longitude: number;
    bearing?: number | null;
    odometer?: number | null;
    speed?: number | null;
}


//---------------------------------------------------------------------------------------------------------------
//ENUMs

enum scheduleRelationship
{
    SCHEDULED   = 0,
    ADDED	    = 1,
    UNSCHEDULED = 2,
    CANCELED    = 3,
}

enum vehicleStopStatus{
    INCOMING_AT     = 0,  //The vehicle is just about to arrive at the stop (on a stop display, the vehicle symbol typically flashes).
    STOPPED_AT	    = 1,  //The vehicle is standing at the stop.
    IN_TRANSIT_TO	= 2,  //The vehicle has departed the previous stop and is in transit.
}

enum CongestionLevel{
    UNKNOWN_CONGESTION_LEVEL = 0,
    RUNNING_SMOOTHLY         = 1,
    STOP_AND_GO              = 2,
    CONGESTION               = 3,
    SEVERE_CONGESTION        = 4,
}

enum OccupancyStatus{
    EMPTY                      = 0,	    //The vehicle is considered empty by most measures, and has few or no passengers onboard, but is still accepting passengers.
    MANY_SEATS_AVAILABLE       = 1,	    //The vehicle has a large percentage of seats available. What percentage of free seats out of the total seats available is to be considered large enough to fall into this category is determined at the discretion of the producer.
    FEW_SEATS_AVAILABLE        = 2,	    //The vehicle has a small percentage of seats available. What percentage of free seats out of the total seats available is to be considered small enough to fall into this category is determined at the discretion of the producer.
    STANDING_ROOM_ONLY	       = 3,     //The vehicle can currently accommodate only standing passengers.
    CRUSHED_STANDING_ROOM_ONLY = 4,	    //The vehicle can currently accommodate only standing passengers and has limited space for them.
    FULL	                   = 5,     //The vehicle is considered full by most measures, but may still be allowing passengers to board.
    NOT_ACCEPTING_PASSENGERS   = 6,	    //The vehicle can not accept passengers.
}
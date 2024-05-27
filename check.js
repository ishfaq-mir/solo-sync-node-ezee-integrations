const l = {
  RoomInfo: {
    RoomTypes: {
      RoomType: [
        {
          ID: "4613800000000000001",
          Name: "3 Bed Mixed Dorm",
        },
        {
          ID: "4613800000000000002",
          Name: "Deluxe Private Room",
        },
        {
          ID: "4613800000000000003",
          Name: "Default Unmapped Room",
        },
      ],
    },
    RateTypes: {
      RateType: [
        {
          ID: "4613800000000000001",
          Name: "EP",
        },
        {
          ID: "4613800000000000002",
          Name: "Default Unmapped Rate",
        },
      ],
    },
    RatePlans: {
      RatePlan: [
        {
          RatePlanID: "4613800000000000001",
          Name: "3 Bed Mixed Dorm - EP",
          RoomTypeID: "4613800000000000001",
          RoomType: "3 Bed Mixed Dorm",
          RateTypeID: "4613800000000000001",
          RateType: "EP",
        },
        {
          RatePlanID: "4613800000000000002",
          Name: "Deluxe Houseboat Private Room EP",
          RoomTypeID: "4613800000000000002",
          RoomType: "Deluxe Private Room",
          RateTypeID: "4613800000000000001",
          RateType: "EP",
        },
      ],
    },
    Saparatechannelsources: {
      Saparatechannelsource: {
        Channel_name: "OTA Common Pool",
        ChannelID: "4613800000000000004",
      },
    },
  },
  Errors: {
    ErrorCode: "0",
    ErrorMessage: "Success",
  },
};

const str = `<RateType>
                    <RoomTypeID>4613800000000000001</RoomTypeID>
                    <RateTypeID>4613800000000000001</RateTypeID>
                    <FromDate>2024-05-28</FromDate>
                    <ToDate>2024-05-29</ToDate>
                    <RoomRate>
                        <Base>1500.0000</Base>
                        <ExtraAdult>0.0000</ExtraAdult>
                        <ExtraChild>0.0000</ExtraChild>
                    </RoomRate>
                </RateType>`;


export interface AdvertiseHttp {
  id: number;
  title: string;
  description: string;
  price: number;
  adresse: {
    city: string;
    streetName: string;
    adresseNumber: number;
    country: string;
    postalCode: number;
  };
  presentationPicture: string;
  gallery: string;
  totalPlaceNumber: number;
  ActualNumberPlace: number;
  reactions: {
    note: number;
  }[];
  advertiseImages: {
    advertise: string;  
    imageSlug: string;
  }[];
  disponibilitieDates: {
    startedAt: string; 
    endedAt: string;   
    advertise: string; 
  }[];
  reservations: {
    startedAt: string; 
    endAt: string;     
    user: {
      lastname: string;
    };
  }[];
  services: {
    name: string;
    advertise: string; 
  }[];
}

export interface Advertise {
  id: number;
  title: string;
  price: number;
  adresse: {
    city: string;
    streetName: string;
    adresseNumber: number;
    country: string;
    postalCode: number;
  };
  presentationPicture: string;
  advertiseImages: {  
    advertise: string;
    imageSlug: string;
  }[]; 
  totalPlaceNumber: number;
  ActualNumberPlace: number;
  reactions: {
    note: number;
  }[];
  disponibilitieDates: {
    startedAt: string; 
    endedAt: string;   
    advertise: string; 
  }[];
  reservations: {
    startedAt: string; 
    endAt: string;     
    user: {
      lastname: string;
    };
  }[];
  services: {
    name: string;
    advertise: string; 
  }[];
}

export namespace Advertise {
  export function fromHttp(advertiseHttp: AdvertiseHttp): Advertise {
    return {
      id: advertiseHttp.id,
      title: advertiseHttp.title,
      price: advertiseHttp.price,
      adresse: {
        city: advertiseHttp.adresse.city,
        streetName: advertiseHttp.adresse.streetName,
        adresseNumber: advertiseHttp.adresse.adresseNumber,
        country: advertiseHttp.adresse.country,
        postalCode: advertiseHttp.adresse.postalCode,
      },
      presentationPicture: advertiseHttp.presentationPicture,
      advertiseImages: advertiseHttp.advertiseImages.map(image => ({  
        advertise: image.advertise,
        imageSlug: image.imageSlug,
      })),
      totalPlaceNumber: advertiseHttp.totalPlaceNumber,
      ActualNumberPlace: advertiseHttp.ActualNumberPlace,
      reactions: advertiseHttp.reactions.map(reaction => ({
        note: reaction.note,
      })),
      disponibilitieDates: advertiseHttp.disponibilitieDates.map(date => ({
        startedAt: date.startedAt,
        endedAt: date.endedAt,
        advertise: date.advertise,
      })),
      reservations: advertiseHttp.reservations.map(reservation => ({
        startedAt: reservation.startedAt,
        endAt: reservation.endAt,
        user: {
          lastname: reservation.user.lastname,
        },
      })),
      services: advertiseHttp.services.map(service => ({
        name: service.name,
        advertise: service.advertise,
      })),
    };
  }
}

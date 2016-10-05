let proto = obj => Object.getPrototypeOf( obj );

class Is {
  constructor( cy ){
    this.cyProto = proto( cy );
    this.elesProto = proto( cy.$() );
  }

  cy( obj ){
    return this.cyProto === proto( obj );
  }

  eles( obj ){
    return this.elesProto === proto( obj );
  }
}

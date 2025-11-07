import { Component, Inject, forwardRef, Optional } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import connectGeoSearch, {
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { Chance } from 'chance';

@Component({
  selector: 'ais-geo-search',
  template: `
    <google-map [center]="center" [zoom]="7" width="100%" height="400px">
      <map-marker
        *ngFor="let item of state.items"
        [position]="item._geoloc">
      </map-marker>
    </google-map>
  `,
})
export class GeoSearchComponent extends TypedBaseWidget<
  GeoSearchWidgetDescription,
  GeoSearchConnectorParams
> {
  private chance = new Chance();

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('GeoSearch');
  }

  // Algolia geo hits will populate this automatically,
  // but we can also add fake ones for testing
  addRandom() {
    const fakeLocation = {
      objectID: this.chance.guid(), // required by Algolia
      name: this.chance.city(),
      _geoloc: {
        lat: this.chance.latitude({ min: 32, max: 37 }),
        lng: this.chance.longitude({ min: -120, max: -115 }),
      } as google.maps.LatLngLiteral,
      __position: this.state.items.length,
    };

    this.state.items = [...this.state.items, fakeLocation];
  }

  // The widget’s render state (Algolia will fill this in)
  public state: GeoSearchWidgetDescription['renderState'] = {
    items: [],
  } as any;

  public override ngOnInit() {
    this.createWidget(connectGeoSearch, {});
    super.ngOnInit();
  }

  // Center the map on the first hit, or fallback to (0,0)
  get center(): google.maps.LatLngLiteral {
    if (this.state.items && this.state.items.length > 0) {
      const [first] = this.state.items;
      return first._geoloc || { lat: 0, lng: 0 };
    }
    return { lat: 0, lng: 0 };
  }
}

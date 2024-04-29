import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';
import { UrlTree } from '@angular/router';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('it should return the string "Radio singular" title',() =>{
    it('should shoe radio singular title', ()=>{
      expect(component.title).toEqual('Radio Singular')
    })

    it('shoud return title on the template', ()=>{
      const title = fixture.nativeElement.querySelector('h1');
      expect(title.textContent).toBe(component.title)
    })
  })

  describe('should search radio station by name', ()=>{
    it('it should have an input with the placeholder: "escribe el nombre de la emisora" ',() =>{
      const inputPlaceholder = fixture.nativeElement.querySelector('input').placeholder;
      expect(inputPlaceholder).toBe('escribe el nombre de la emisora');
    })
    it('should have a button with the title search', ()=>{
      const searchButotn = fixture.nativeElement.querySelector('button').textContent;
      const text = 'Buscar';
      expect(searchButotn).toBe(text);
    })

    it('should run the search function once', ()=>{
      const radioSpy = jest.spyOn(component, 'searchRadio')
      const searchButotn = fixture.debugElement.query(By.css('button'));
      searchButotn.triggerEventHandler('click',null)
      fixture.detectChanges();
      expect(radioSpy).toHaveBeenCalledTimes(1);
    })

    describe('radio station list', ()=>{
      it('should have a list', ()=>{
        const list = fixture.nativeElement.querySelector('ul');
        expect(list).not.toBeNull()
      })
      it('should have an empty array', ()=>{
        const listArray = fixture.nativeElement.querySelectorAll('li');
        expect(listArray.length).toBe(0);
      })

      it('if request is succesfull it should return at least 1 result', ()=>{
        const radioSpy = jest.spyOn(component, 'searchRadio').mockImplementation(() =>{
          component.filterArray = component.radioStations.filter((radio)=>{
            return radio.name.includes('t')
          })
        });
        // const inputValue = fixture.debugElement.query(By.css('input'));
        // inputValue.triggerEventHandler('keyUp', '')
        const searchButotn = fixture.debugElement.query(By.css('button'));
        searchButotn.triggerEventHandler('click', null);
        const listArray = fixture.nativeElement.querySelectorAll('li');
        component.filterArray = [
          {name: "test",
            url: "test",
            country: "test"
          }
        ]
        fixture.detectChanges();
        expect(listArray.length).toBeGreaterThan(0);


      })
    })
  })
});

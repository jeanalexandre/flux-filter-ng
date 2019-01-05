import {Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent, MatAutocompleteTrigger,
  MatChipInputEvent,
  MatDialogRef
} from "@angular/material";
import {Application} from "../../models/application.model";
import {newFlow} from "../../models/newFlow.model";

@Component({
  selector: 'app-add-flow-dialog',
  templateUrl: './add-flow-dialog.component.html',
  styleUrls: ['./add-flow-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddFlowDialogComponent implements OnInit {

  flowForm: FormGroup;
  technoCtrl = new FormControl();
  defaultTechnologies: string[] = ['HTTP', 'SOCKET.IO', 'RABBITMQ', 'REST', 'SOAP'];
  applications: Application[];
  technologies: string[] = [];
  filteredTechnologies: string[] = this.defaultTechnologies;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('technoInput') technoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFlowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { flow, editing, technos, applications},
  ) {
  }

  ngOnInit(): void {
    this.applications = this.data.applications;
    this.initTechnos();
    this.flowForm = this.formBuilder.group({
      sourceApp: [this.data.flow.sourceApp ? this.data.flow.sourceApp.id : '', [Validators.required,]],
      targetApp: [this.data.flow.targetApp ? this.data.flow.targetApp.id : '', [Validators.required,]],
      name: [this.data.flow.name, [Validators.required, Validators.minLength(2),]],
      description: [this.data.flow.description, [Validators.required, Validators.minLength(2),]],
      techno: ['', [Validators.required,]],
    });
  }

  get name() {
    return this.flowForm.get('name');
  }

  get description() {
    return this.flowForm.get('description');
  }

  get sourceApp() {
    return this.flowForm.get('sourceApp')
  }

  get targetApp() {
    return this.flowForm.get('targetApp')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let flow = new newFlow(
      this.sourceApp.value,
      this.targetApp.value,
      this.getTechnoString(),
      this.name.value,
      this.description.value);
    this.data.editing ? flow.id = this.data.flow.id : null;
    this.dialogRef.close(flow);
  }

  new(event){
    if(event.keyCode == 13) {
      this.autocomplete.closePanel();
      this.technologies.push(this.technoInput.nativeElement.value);
      this.technoInput.nativeElement.value = '';
      this.updateListTechno();
      this.technoInput.nativeElement.blur();
      this.technoCtrl.setValue(null);
    }
  }

  add(event: MatChipInputEvent): void {
    // Add technology only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our technology
      if ((value || '').trim()) {
        this.technologies.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.technoCtrl.setValue(null);
    }
  }

  remove(techno: string): void {
    const index = this.technologies.indexOf(techno);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
    this.updateListTechno();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologies.push(event.option.viewValue);
    this.technoInput.nativeElement.value = '';
    this.updateListTechno();
    this.technoInput.nativeElement.blur();
    this.technoCtrl.setValue(null);
  }

  private initTechnos(): void {
    for (let techno of this.data.technos) {
      this.technologies.push(techno);
    }
    this.updateListTechno();
  }

  private updateListTechno(): void {
    this.filteredTechnologies = this.defaultTechnologies.filter(techno => !this.technologies.includes(techno));
  }

  private getTechnoString(): string {
    const technos = this.technologies;
    let flag = false;
    let technoString = '';
    for (let techno of technos) {
      if (flag) {
        technoString += ',' + techno;
      } else {
        technoString += techno;
        flag = true;
      }
    }
    return technoString;
  }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ReviewRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class ReviewCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ReviewCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Review::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/review');
        CRUD::setEntityNameStrings('Отзыв', 'Отзывы');
        $this->crud->denyAccess(['create']);
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::addColumn([
            'name' => 'id', 
            'label' => 'id'
        ]); 
        CRUD::addColumn([
            'name' => 'name', 
            'label' => 'Имя'
        ]); 
        CRUD::column('email');

        CRUD::addColumn([
            'name' => 'rating', 
            'label' => 'Рейтинг'
        ]);

        CRUD::addColumn([
            'name' => 'rewiew', 
            'label' => 'Отзыв'
        ]); 
        
        CRUD::addColumn([
            'name' => 'verify', 
            'label' => 'Подтвержден',
            'type'  => 'boolean',
            'options' => [
                0 => 'нет', 
                1 => 'Да'
            ]
        ]); 

        CRUD::addColumn([
            'name' => 'site_id', 
            'label' => 'Название сайта',
            'type'  => 'model_function',
            'function_name' => 'getNameSite',
        ]); 

        CRUD::addColumn([
            'name' => 'source', 
            'label' => 'Источник'
        ]); 
        CRUD::addColumn([
            'name' => 'created_at', 
            'label' => 'Дата создания'
        ]); 

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']); 
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(ReviewRequest::class);

        CRUD::addField([
            'name' => 'name', 
            'label' => 'Имя'
        ]); 
        CRUD::field('email');

        CRUD::addField([
            'name' => 'rating', 
            'label' => 'Рейтинг'
        ]);

        CRUD::addField([
            'name' => 'rewiew', 
            'label' => 'Отзыв'
        ]); 
        
        CRUD::addField([
            'name' => 'verify', 
            'label' => 'Подтвержден',
            'type'  => 'boolean',
            'options' => [
                0 => 'нет', 
                1 => 'Да'
            ]
        ]); 

        CRUD::addField([
            'name' => 'source', 
            'label' => 'Источник'
        ]); 

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number'])); 
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}


{{-- textarea --}}
@include('crud::fields.inc.wrapper_start')
    <label>{!! $field['label'] !!}</label>
    @include('crud::fields.inc.translatable_icon')
    <textarea
    	name="{{ $field['name'] }}"
        @include('crud::fields.inc.attributes')

    	>{!! old_empty_or_null($field['name'], '') ??  $field['value'] ?? $field['default'] ?? '' !!}</textarea>

<script src="https://cdn.tiny.cloud/1/hw85xe145txckluurrl5gbcrs91v1upjpk2mf4er05bajlw6/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

<script>
    tinymce.init({
		selector: 'textarea',
		plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
		toolbar: 'link image | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | language | code',
		content_langs: [
			{ title: 'Russian', code: 'ru' }
		],
		language: 'ru',
		plugins: 'image code',
		image_title: true,
		automatic_uploads: true,
		images_upload_url: '/article/save-image',
		images_upload_base_path: '/public/article/img',
		file_picker_callback: (cb, value, meta) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');

			input.addEventListener('change', (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener('load', () => {
				/*
				Note: Now we need to register the blob in TinyMCEs image blob
				registry. In the next release this part hopefully won't be
				necessary, as we are looking to handle it internally.
				*/
				const id = 'blobid' + (new Date()).getTime();
				const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
				const base64 = reader.result.split(',')[1];
				const blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				/* call the callback and populate the Title field with the file name */
				cb(blobInfo.blobUri(), { title: file.name });
			});
			reader.readAsDataURL(file);
			});

			input.click();
		},
		content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
	});
</script>

@include('crud::fields.inc.wrapper_end')
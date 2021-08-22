export const constants = {
  storageKey: {
    accesTokenKey: 'visi',
    userLoginKey: 'misi',
  },
  photoFlag: {
    photoPres: 'photo_pres',
    photoVicePres: 'photo_vice_pres'
  },
  candidateStatus: {
    active: 'active',
    inactive: 'inactive'
  },
  phoneInput: {
    pattern: /0\d{10,14}/,
    delimiter: ['-'],
    mask: '0000-0000-00099999'
  },
  nimInput: {
    pattern: /\d{5,7}/,
    mask: '0000000'
  },
  verificationInput: {
    mask: '000000'
  },
  tinyMceSettings: {
    inline: false,
    statusbar: false,
    browser_spellcheck: true,
    height: 320,
    plugins: ['lists'],
    toolbar:
      'undo redo | formatselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
    menu: {
        file: { title: 'File', items: 'newdocument' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
        insert: { title: 'Insert', items: 'inserttable' },
        view: { title: 'View', items: 'visualaid' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontsize align | removeformat' },
        table: { title: 'Table', items: 'inserttable tableprops deletetable row column cell' }
    }
  },
};

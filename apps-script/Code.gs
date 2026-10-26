/**
 * BACKEND LƯU KẾT QUẢ – BÀI CA VỀ MẶT TRỜI
 * Dán mã này vào Google Apps Script rồi triển khai thành Ứng dụng web.
 */
const SHEET_NAME = 'Ket_qua_Bai_ca_ve_mat_troi';
const TAB_NAME = 'Kết quả học sinh';

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    service: 'Bai ca ve mat troi',
    message: 'Backend đang hoạt động.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw) return json_({ ok: false, message: 'Thiếu dữ liệu payload.' });
    const data = JSON.parse(raw);
    const name = String(data.name || '').trim().slice(0, 100);
    const group = String(data.group || '').trim().slice(0, 50);
    const correct = Number(data.correct);
    const total = Number(data.total);
    const answers = Array.isArray(data.answers) ? data.answers.join(', ') : String(data.answers || '');
    if (!name || !group || !Number.isFinite(correct) || !Number.isFinite(total)) {
      return json_({ ok: false, message: 'Thông tin bài làm chưa đầy đủ.' });
    }
    const props = PropertiesService.getScriptProperties();
    let id = props.getProperty('RESULTS_SPREADSHEET_ID');
    let ss;
    if (id) {
      ss = SpreadsheetApp.openById(id);
    } else {
      ss = SpreadsheetApp.create(SHEET_NAME);
      props.setProperty('RESULTS_SPREADSHEET_ID', ss.getId());
    }
    let sheet = ss.getSheetByName(TAB_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0];
      sheet.setName(TAB_NAME);
      sheet.appendRow(['Thời gian nộp', 'Họ tên học sinh', 'Nhóm', 'Số câu đúng', 'Tổng số câu', 'Điểm / 10', 'Đáp án đã chọn']);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    sheet.appendRow([new Date(), name, group, correct, total, total > 0 ? Math.round(correct / total * 100) / 10 : 0, answers]);
    return json_({ ok: true, message: 'Đã lưu kết quả.', spreadsheetUrl: ss.getUrl() });
  } catch (err) {
    return json_({ ok: false, message: String(err && err.message || err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
